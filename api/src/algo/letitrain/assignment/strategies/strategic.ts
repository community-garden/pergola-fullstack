import { AssignStrategyFn, PersonState } from "../types"

export const assignStrategyStrategic: AssignStrategyFn<any> = function (
  tasksStates,
  personsStates
) {
  if ( tasksStates.length == 0 ) return null

  const tasks_sorted = tasksStates.sort(
    ( t1, t2 ) => t1.remaining_possible_persons - t2.remaining_possible_persons
  )
  const task = tasks_sorted[0] /** we could pick one of the minima **/

  const persons_sorted = task.available.sort(
    ( p1: PersonState, p2: PersonState ) =>
      p2.remaining_allowed_tasks - p1.remaining_allowed_tasks
  )
  const person =
    persons_sorted[0] /** We could pick one of the maxima and also considder remaining_allowed_tasks **/

  return [task, person]
}
