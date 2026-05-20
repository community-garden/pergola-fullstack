import { AssignStrategyFn, PersonState } from "../types.js"

export const assignStrategyStrategic: AssignStrategyFn<any> = function (
  tasksStates,
  personsStates
) {
  if (tasksStates.length == 0) return null

  const tasks_sorted = tasksStates.sort(
    (t1, t2) => t1.remaining_possible_persons - t2.remaining_possible_persons
  )
  const task = tasks_sorted[0]

  const persons_sorted = task.available.sort(
    (p1: PersonState, p2: PersonState) =>
      p2.remaining_allowed_tasks - p1.remaining_allowed_tasks
  )
  const person = persons_sorted[0]

  return [task, person]
}
