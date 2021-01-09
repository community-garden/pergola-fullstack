import { AssignStrategyFn, personListIncludesPerson } from "../types"

/** This is a baseline to compare better strategies and a tool for exhaustive tests.
    Be aware, that this strategy is biased to assign users with high availability! **/
export const assignStrategyRandom: AssignStrategyFn<any> = function (
  tasksStates,
  personsStates
) {
  const tasksAssignable = tasksStates.filter(
    ( t ) => t.missing_count > 0 && t.remaining_possible_persons > 0
  )
  if ( tasksAssignable.length == 0 ) return null
  const task =
    tasksAssignable[Math.floor( Math.random() * tasksAssignable.length )]
  const personsAssignable = personsStates.filter(
    ( p ) =>
      p.remaining_allowed_tasks > 0 &&
      personListIncludesPerson( task.available, p ) &&
      !personListIncludesPerson( task.assigned, p )
  )
  if ( personsAssignable.length == 0 ) return null
  const person =
    personsAssignable[Math.floor( Math.random() * personsAssignable.length )]
  return [task, person]
}
