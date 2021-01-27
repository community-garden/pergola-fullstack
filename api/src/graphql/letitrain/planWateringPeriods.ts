import { hasRole } from "keycloak-connect-graphql"

import {
  calcExplicitStates,
  calcStats,
  planAssignments,
} from "../../algo/letitrain/assignment"
import { Task } from "../../algo/letitrain/assignment/types"
import { neo4jdriver } from "../../config/neo4j"
import { presets } from "../../config/roles"
import {
  flatten,
  neo4jDateInput2iso, neo4jDateInput2Date,
  withinTransaction,
} from "../../lib/neo4j"
import { apply, groupBy } from "../../lib/util"
import dayjs from 'dayjs'
import * as R from 'ramda'

type Days = number;
type Periods = number;

interface PlaningConfig {
  period_length: Days;
  planning_ahead: Days;
  periods_predefined: Periods;
}

/** planWateringPeriods for all periods, with period.from <= now+planning_ahead **/
async function planPeriods( planning_ahead, default_target_count = 2 ) {
  const planablePeriods = (await withinTransaction(neo4jdriver.session(), async ( tx ) =>
    await tx.run( "MATCH (t:WateringTask)-[r:within]-(p:WateringPeriod) " +
		  "WHERE not(exists((t)-[:assigned]-(:User))) " +
		  "AND date(p.from) < date() + duration({days: $planning_ahead}) " +
		  "RETURN DISTINCT p",
                  {planning_ahead} ))).records.map(flatten).map(r => ({from: neo4jDateInput2iso(r.p.from), till: neo4jDateInput2iso(r.p.till)}))
  const periods = await Promise.all(
    planablePeriods.map( async ( p ) => {
      const period_records = (
        await withinTransaction(
          neo4jdriver.session(),
          async ( tx ) =>
            await tx.run(
              "MATCH (period:WateringPeriod {from: date($from), till: date($till)})-[r:within]-(task:WateringTask) " +
                "MATCH (task:WateringTask)-[w:within]-(period) " +
                "MATCH (user:User)-[a:available]-(task) " +
                "RETURN period, task, user",
              p
            )
        )
      ).records
      return groupBy(
        period_records.map(( r ) => flatten( r )),
        ( r ) => r.task.date
      )
    } )
  )
  const periods_tasks: Task<string>[][] = periods.map(( period ) =>
    Object.values( period ).map(( flattened_task ) => ( {
      date: neo4jDateInput2iso( flattened_task[0].task.date ),
      available: Object.values( flattened_task ).map(( i ) => ( {
        id: i.user.id,
        maximum_tasks: 3,
      } )), // TODO
      assigned: [],
      target_count: default_target_count,
    } ))
  )
  const planning_results = periods_tasks.map(( pt ) =>
    planAssignments<string>( pt )
  )
  const planning_stats = planning_results.map(( pr ) =>
    apply( calcStats, calcExplicitStates( pr ))
  )
  await withinTransaction( neo4jdriver.session(), async ( tx ) =>
    planning_results.map(( tasks ) =>
      tasks.map(( task ) =>
        task.assigned.map(( person ) =>
          tx.run(
            "MERGE (user:User {id: $id}) " +
              "MERGE (task:WateringTask {date: date($date)}) " +
              "MERGE (user)-[r:assigned]-(task)",
            { id: person.id, date: task.date }
          )
        )
      )
    )
  )
  return {
    planablePeriods,
    planedPeriods: planning_results.length,
    planning_stats,
    planning_results,
  }
}

async function calc_first_new_period_start( session ) {
  const regular = neo4jDateInput2Date((await withinTransaction( session, ( tx ) =>
    tx.run("Match (p:WateringPeriod) return MAX(date(p.till)) + duration({days: 1})"))).records[0].get(0))
  const today = new Date()
  return dayjs(regular > today ? regular : today).format('YYYY-MM-DD')
}

export async function merge_WateringTask_within_Period( tx, period, date ) {
  return tx.run(
    "MERGE (period:WateringPeriod{from: date($from), till: date($till)}) " +
      "MERGE (task:WateringTask {date: date($date)}) SET task.label = $date " +
      "MERGE (task)-[r:within]-(period)",
    { ...period, date: date }
  )
}

async function createFuturePeriods(periods_predefined, period_length) {
  const first_new_period_start = await calc_first_new_period_start(neo4jdriver.session())
  const periods_to_create = periods_predefined - Math.ceil(dayjs(first_new_period_start).diff(dayjs(), 'days') / period_length)
  const new_periods = R.range(0, periods_to_create).map(p => {
    const period_start = dayjs(first_new_period_start).add(p*period_length, 'day')
    return {
      from: period_start.format('YYYY-MM-DD'),
      till: period_start.add(period_length - 1, 'day').format('YYYY-MM-DD'),
      task_dates: R.range(0, period_length).map(offset => period_start.add(offset, 'day').format('YYYY-MM-DD'))
    }
  })
  const result = await withinTransaction( neo4jdriver.session(), ( tx ) =>
    new_periods.map( async ( period ) =>
      period.task_dates.map( async ( date ) =>
        merge_WateringTask_within_Period( tx, period, date )
      )
    )
  )
  return {
    first_new_period_start,
    new_periods,
    created_periods: result.length,
  }
}

const Mutation = {
  planWateringPeriods: hasRole( presets.garden_manager )(
    async ( _, args: PlaningConfig, ctx, info ) => {
      const {
        period_length = 7,
        planning_ahead = 7,
        periods_predefined = 4,
      } = args
      const result_period_planning = await planPeriods(planning_ahead)
      const result_period_creation = await createFuturePeriods(periods_predefined, period_length)
      return {
        config: { period_length, planning_ahead, periods_predefined },
        result_period_planning,
        result_period_creation,
      }
    }
  ),
}

export default { resolvers: { Mutation } }
