import { random } from "../../../../lib/util"
import { AssignStrategyFn } from "../types"
import { assignStrategyRandom } from "./random"

export const assignStrategyForcing: AssignStrategyFn<any> = function (
  tasksStates,
  personsStates,
  fallbackStrategy = assignStrategyRandom
) {
  /** Is there a task only assignable to exactly 1 person? **/
  const forcingTasks = tasksStates.filter(
    ( ts ) => ts.remaining_possible_persons == 1
  )
  if ( forcingTasks.length > 0 ) {
    const task = random( forcingTasks )
    //console.log('forced', task.date)
    return [task, task.available[0]]
  }

  /** Is there a person only assignable to 1 task?
   *  Forcing the assignment of this person is not `fair` but optimal for maximizing the number of assignments.
   *  Regarding the full assignment of as many as possible tasks, the choice between forcingPersons doesn't matter. **/
  const forcingPersons = personsStates.filter(
    ( ps ) => ps.remaining_possible_tasks == 1
  )
  if ( forcingPersons.length > 0 ) {
    const person = random( forcingPersons )
    //console.log('forced', person.id)
    return [
      tasksStates[
        tasksStates.findIndex(( t ) =>
          t.available.map(( p ) => p.id ).includes( person.id )
        )
      ],
      person,
    ]
  }

  return fallbackStrategy( tasksStates, personsStates )
}
