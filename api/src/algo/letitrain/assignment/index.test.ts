import { apply, merge } from "../../../lib/util"
import {
  assign,
  calcExplicitStates,
  calcStats,
  planAssignments,
} from "./index"
import { assignStrategyForcing } from "./strategies/forcing"
import { assignStrategyRandom } from "./strategies/random"
import { assignStrategyStrategic } from "./strategies/strategic"
import juli from "./test-data/juli"
import simple from "./test-data/simple"

//TODO: why is it not possible to import example tasks from test-data at the first place
const exampleTasks = { simple, juli}

test( "calcExplicitState() invariants over single assign() by assignStrategyRandom()", () => {
  const tasks = exampleTasks.simple
  const [initialPersonsStates, initialTasksStates] = calcExplicitStates( tasks )
  const [task, person] = assignStrategyRandom(
    initialTasksStates,
    initialPersonsStates
  )
  const updatedTasks = assign( tasks, task, person )
  const [assignedPersonsStates, assignedTasksStates] = calcExplicitStates(
    updatedTasks
  )
  const pi = assignedPersonsStates.findIndex(( p ) => p.id === person.id )
  const ti = assignedTasksStates.findIndex(( t ) => t.date === task.date )
  expect( assignedPersonsStates[pi].remaining_allowed_tasks ).toBe(
    initialPersonsStates[pi].remaining_allowed_tasks - 1
  )
  expect( assignedPersonsStates[pi].remaining_possible_tasks ).toBe(
    initialPersonsStates[pi].remaining_possible_tasks - 1
  )
  expect( assignedTasksStates[ti].missing_count ).toBe(
    initialTasksStates[ti].missing_count - 1
  )
  expect( assignedTasksStates[ti].remaining_possible_persons ).toBe(
    initialTasksStates[ti].remaining_possible_persons - 1
  )
} )

test( "invariants over planAssignments() tested by assignStrategyRandom()", () => {
  const plannedTasks = planAssignments( exampleTasks.simple )
  const [plannedPersonsStates, plannedTasksStates] = calcExplicitStates(
    plannedTasks
  )
  const stats = calcStats( plannedPersonsStates, plannedTasksStates )
  expect( stats.maximum - stats.required ).toEqual( stats.reserve - stats.missing )
} )

test( "benchmark assignment stragegies using real example data", () => {
  const tasks_orig = exampleTasks.juli
  const states_orig = calcExplicitStates( tasks_orig )
  const stats_orig = apply( calcStats, states_orig )
  console.log( stats_orig )

  const stragegies = {
    random: assignStrategyRandom,
    forcing_random: assignStrategyForcing,
    stragic: assignStrategyStrategic,
  }
  const loss_by_strategy = apply(
    merge,
    Object.entries( stragegies ).map(( [strategy_name, strategy] ) => {
      /** we assume example data to be maximal constraint, so no strategy should be able to find an additional assignment on top of the original assignments */
      const tasks_replanned = planAssignments( tasks_orig, strategy )
      const states_replanned = calcExplicitStates( tasks_replanned )
      expect( states_orig ).toStrictEqual( states_replanned )

      /** lets see what our strategy can achieve when planning from scratch **/
      const tasks = tasks_orig.map(( t ) => ( { ...t, assigned: [] } ))
      const tasks_planned = planAssignments( tasks, strategy )
      const states_planned = calcExplicitStates( tasks_planned )
      const stats_planned = apply( calcStats, states_planned )
      return { [strategy_name]: stats_planned.missing }
    } )
  )
  console.info(
    "Juli:",
    { available: stats_orig.available, maximum: stats_orig.maximum },
    {
      required: stats_orig.required,
      orig: stats_orig.missing,
      optimum: stats_orig.optimum,
    },
    loss_by_strategy
  )
} )
