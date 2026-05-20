import { describe, it, expect } from "bun:test"
import {
  assign,
  calcExplicitStates,
  calcStats,
  planAssignments,
} from "../src/index.js"
import { assignStrategyForcing } from "../src/strategies/forcing.js"
import { assignStrategyRandom } from "../src/strategies/random.js"
import { assignStrategyStrategic } from "../src/strategies/strategic.js"
import simpleTasks from "../src/test-data/simple.js"

function freshSimple() {
  return simpleTasks.map((t) => ({ ...t, assigned: [] }))
}

describe("calcExplicitStates + assign", () => {
  it("decrements person and task counters by 1 after a single assign()", () => {
    const tasks = freshSimple()
    const [initialPersonsStates, initialTasksStates] = calcExplicitStates(tasks)
    const assignableTasks = initialTasksStates.filter(
      (t) => t.missing_count > 0 && t.remaining_possible_persons > 0
    )
    const task = assignableTasks[0]
    const person = task.available[0]

    const updatedTasks = assign(tasks, task, person)
    const [updatedPersonsStates, updatedTasksStates] = calcExplicitStates(updatedTasks)

    const pi = updatedPersonsStates.findIndex((p) => p.id === person.id)
    const ti = updatedTasksStates.findIndex((t) => t.date === task.date)

    expect(updatedPersonsStates[pi].remaining_allowed_tasks).toBe(
      initialPersonsStates[initialPersonsStates.findIndex((p) => p.id === person.id)]
        .remaining_allowed_tasks - 1
    )
    expect(updatedTasksStates[ti].missing_count).toBe(
      initialTasksStates[initialTasksStates.findIndex((t) => t.date === task.date)]
        .missing_count - 1
    )
  })
})

describe("planAssignments invariants", () => {
  it("satisfies global capacity invariant: maximum - required == reserve - missing", () => {
    const planned = planAssignments(freshSimple())
    const [persons, tasks] = calcExplicitStates(planned)
    const stats = calcStats(persons, tasks)
    expect(stats.maximum - stats.required).toEqual(stats.reserve - stats.missing)
  })

  it("never exceeds maximum_tasks per person", () => {
    const planned = planAssignments(freshSimple())
    const [persons] = calcExplicitStates(planned)
    for (const p of persons) {
      expect(p.remaining_allowed_tasks).toBeGreaterThanOrEqual(0)
    }
  })

  it("only assigns people who are in the task's available list", () => {
    const planned = planAssignments(freshSimple())
    for (const task of planned) {
      for (const assignedPerson of task.assigned) {
        const inAvailable = task.available.some((p) => p.id === assignedPerson.id)
        expect(inAvailable).toBe(true)
      }
    }
  })

  it("strategic strategy fully covers the simple dataset (missing == 0)", () => {
    const planned = planAssignments(freshSimple(), assignStrategyStrategic)
    const [persons, tasks] = calcExplicitStates(planned)
    const stats = calcStats(persons, tasks)
    expect(stats.missing).toBe(0)
  })
})

describe("strategy comparison on simple dataset", () => {
  const strategies = [
    ["random", assignStrategyRandom],
    ["forcing", assignStrategyForcing],
    ["strategic", assignStrategyStrategic],
  ] as const

  for (const [name, strategy] of strategies) {
    it(`${name} strategy achieves missing == 0 on simple dataset`, () => {
      const planned = planAssignments(freshSimple(), strategy)
      const [persons, tasks] = calcExplicitStates(planned)
      const stats = calcStats(persons, tasks)
      expect(stats.missing).toBe(0)
    })
  }
})

describe("strategic strategy determinism", () => {
  it("produces the same result on repeated runs", () => {
    const result1 = planAssignments(freshSimple(), assignStrategyStrategic)
    const result2 = planAssignments(freshSimple(), assignStrategyStrategic)
    expect(result1.map((t) => t.assigned.map((p) => p.id))).toEqual(
      result2.map((t) => t.assigned.map((p) => p.id))
    )
  })
})
