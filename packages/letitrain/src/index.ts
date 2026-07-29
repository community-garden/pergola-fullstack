export { generateWateringICS } from "./ics.js"
export type { WateringIcsOptions } from "./ics.js"

import { assignStrategyStrategic } from "./strategies/strategic.js"
import {
  AssignmentStats,
  AssignStrategyFn,
  Person,
  personListIncludesPerson,
  PersonState,
  Task,
  TaskState,
} from "./types.js"

function unique<T>(vs: T[]): T[] {
  return [...new Set(vs)]
}

function sum(ns: number[]): number {
  return ns.reduce((a, b) => a + b, 0)
}

export function calcExplicitStates<date>(
  tasks: Task<date>[]
): [PersonState[], TaskState<date>[]] {
  const availablePersons: Person[] = unique(
    tasks.flatMap((t) => t.available)
  )
  const availablePersonsStates: PersonState[] = availablePersons.map(
    (person) => ({
      ...person,
      remaining_allowed_tasks:
        person.maximum_tasks -
        tasks.filter((t) => personListIncludesPerson(t.assigned, person))
          .length,
      remaining_possible_tasks: tasks.filter(
        (t) =>
          personListIncludesPerson(t.available, person) &&
          !personListIncludesPerson(t.assigned, person) &&
          t.assigned.length != t.target_count
      ).length,
    })
  )
  const tasksStates: TaskState<date>[] = tasks.map((task) => ({
    ...task,
    missing_count: task.target_count - task.assigned.length,
    remaining_possible_persons: availablePersonsStates.filter(
      (p) =>
        personListIncludesPerson(task.available, p) &&
        !personListIncludesPerson(task.assigned, p) &&
        p.remaining_allowed_tasks != 0
    ).length,
  }))
  return [availablePersonsStates, tasksStates]
}

export function preassignment_check(
  task: Task<any>,
  person: Person,
  tasksStates: TaskState<any>[],
  personsStates: PersonState[]
) {
  const personState =
    personsStates[personsStates.findIndex((p) => p.id == person.id)]
  return (
    personListIncludesPerson(task.available, person) &&
    !personListIncludesPerson(task.assigned, person) &&
    personState.remaining_allowed_tasks >= 1
  )
}

export function assign<date>(
  tasks: Task<date>[],
  task: Task<date>,
  person: Person
): Task<date>[] {
  return tasks.map((t) =>
    t.date == task.date ? { ...t, assigned: t.assigned.concat(person) } : t
  )
}

export function planAssignments<date>(
  tasks: Task<date>[],
  assignStrategy: AssignStrategyFn<date> = assignStrategyStrategic
): Task<date>[] {
  const [personsStates, tasksStates] = calcExplicitStates(tasks)
  const assignablePersonsStates = personsStates.filter(
    (p) => p.remaining_allowed_tasks > 0
  )
  const assignableTasksStates = tasksStates
    .map((t) => ({
      ...t,
      available: assignablePersonsStates.filter((ps) =>
        preassignment_check(t, ps, tasksStates, assignablePersonsStates)
      ),
    }))
    .filter((t) => t.missing_count > 0 && t.remaining_possible_persons > 0)
  const assignment = assignStrategy(assignableTasksStates, assignablePersonsStates)
  if (!assignment) return tasks

  const [task, person] = assignment
  const ok = preassignment_check(task, person, tasksStates, personsStates)
  if (!ok) {
    console.error("Assignment would contradict constraints:", task.date, person.id)
    return tasks
  }

  return planAssignments(assign(tasks, task, person), assignStrategy)
}

export function calcStats<date>(
  personsStates: PersonState[],
  tasksStates: TaskState<date>[]
): AssignmentStats {
  return {
    tasks: tasksStates.length,
    persons: personsStates.length,
    required: sum(tasksStates.map((t) => t.target_count)),
    maximum: sum(personsStates.map((p) => p.maximum_tasks)),
    available: sum(tasksStates.map((t) => t.available.length)),
    missing: sum(tasksStates.map((t) => t.missing_count)),
    reserve: sum(personsStates.map((p) => p.remaining_allowed_tasks)),
    optimum: sum(tasksStates.map((t) => Math.max(0, t.target_count - t.available.length))),
  }
}
