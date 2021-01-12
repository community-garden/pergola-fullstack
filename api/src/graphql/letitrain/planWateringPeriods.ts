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
  neo4jDateInput2iso,
  withinTransaction,
} from "../../lib/neo4j"
import { apply, groupBy } from "../../lib/util"

type Days = number;
type Periods = number;

interface PlaningConfig {
  period_length: Days;
  planning_ahead: Days;
  periods_predefined: Periods;
}

/** planWateringPeriods for all periods, with period.from <= now+planning_ahead **/
async function planPeriods( default_target_count = 2 ) {
  const planablePeriods = [{ from: "2020-01-01", till: "2020-01-07" }] // TODO
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

export async function merge_WateringTask_within_Period( tx, period, date ) {
  return tx.run(
    "MERGE (period:WateringPeriod{from: date($from), till: date($till)}) " +
      "MERGE (task:WateringTask {date: date($date)}) SET task.label = $date " +
      "MERGE (task)-[r:within]-(period)",
    { ...period, date: date }
  )
}

async function createFuturePeriods() {
  const first_new_period_start = "2020-02-01" // TODO max(today, 1+latest)
  const new_periods = [
    {
      from: "2020-02-01",
      till: "2020-02-07",
      task_dates: [
        "2020-02-01",
        "2020-02-02",
        "2020-02-03",
        "2020-02-04",
        "2020-02-05",
        "2020-02-06",
        "2020-02-07",
      ],
    },
  ]
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
      const result_period_planning = await planPeriods()
      const result_period_creation = await createFuturePeriods()
      return {
        config: { period_length, planning_ahead, periods_predefined },
        result_period_planning,
        result_period_creation,
      }
    }
  ),
}

export default { resolvers: { Mutation } }
