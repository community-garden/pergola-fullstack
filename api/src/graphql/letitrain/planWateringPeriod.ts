import dayjs from "dayjs"
import { hasRole } from "keycloak-connect-graphql"
import * as R from "ramda"

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
neo4jDateInput2Date,
  neo4jDateInput2iso,   withinTransaction,
} from "../../lib/neo4j"
import { apply, groupBy } from "../../lib/util"
import {publishChange} from "./wateringTaskChange"

type Days = number;
type Periods = number;

/** planWateringPeriods for all periods, with period.from <= now+planning_ahead **/
async function planPeriod( periodId: string, default_target_count=2, fallback_maximum_tasks=3  ) {
  const planablePeriods = ( await withinTransaction( neo4jdriver.session(), async ( tx ) =>
    await tx.run( "MATCH (p:WateringPeriod ) " +
      "WHERE ID(p) = $periodId " +
		  "CALL { WITH p MATCH (t:WateringTask)-[r:within]-(p:WateringPeriod) " +
                  "       WITH exists((t)-[:assigned]-(:User)) AS x " +
                  "       WHERE not(x) RETURN * } " +
		  "RETURN  p",
                  {periodId: parseInt( periodId )} ))).records.map( flatten ).map( r => ( {from: neo4jDateInput2iso( r.p.from ), till: neo4jDateInput2iso( r.p.till )} ))
  const periods = await Promise.all(
    planablePeriods.map( async ( p ) => {
      const period_records = (
        await withinTransaction(
          neo4jdriver.session(),
          async ( tx ) =>
            await tx.run(
              "MATCH (period:WateringPeriod {from: date($from), till: date($till)})-[:within]-(task:WateringTask) " +
              "MATCH (task:WateringTask)-[:within]-(period) " +
              "MATCH (user:User)-[:available]-(task) " +
	      "OPTIONAL MATCH (settings:UserSettings)-[:of]-(user) " +
              "RETURN period, task, user, settings",
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
        maximum_tasks: i.settings?.letitrain_maximum_tasks || fallback_maximum_tasks,
      } )),
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


const Mutation = {
  planWateringPeriod: hasRole( presets.garden_manager )(
    async ( _, args: {periodId: string}, ctx, info ) => {
      const result_period_planning = await planPeriod( args.periodId )
      publishChange()
      return {
        result_period_planning,
      }
    }
  ),
}

export default { resolvers: { Mutation } }
