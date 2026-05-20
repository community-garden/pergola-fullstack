import { AssignStrategyFn } from "../types.js"
import { assignStrategyRandom } from "./random.js"

export const assignStrategyForcing: AssignStrategyFn<any> = function (
  tasksStates,
  personsStates,
  fallbackStrategy = assignStrategyRandom
) {
  const forcingTasks = tasksStates.filter(
    (ts) => ts.remaining_possible_persons == 1
  )
  if (forcingTasks.length > 0) {
    const task = forcingTasks[Math.floor(Math.random() * forcingTasks.length)]
    return [task, task.available[0]]
  }

  const forcingPersons = personsStates.filter(
    (ps) => ps.remaining_possible_tasks == 1
  )
  if (forcingPersons.length > 0) {
    const person =
      forcingPersons[Math.floor(Math.random() * forcingPersons.length)]
    return [
      tasksStates[
        tasksStates.findIndex((t) =>
          t.available.map((p) => p.id).includes(person.id)
        )
      ],
      person,
    ]
  }

  return fallbackStrategy(tasksStates, personsStates)
}
