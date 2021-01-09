import {
  assign,
  calcExplicitStates,
  calcStats,
  planAssignments,
} from "./index"
import { assignStrategyRandom } from "./strategies/random"
import { exampleTasks } from "./test-data"

test( "calcExplicitState() invariants over single assign() step with assignStrategyRandom()", () => {
  const [initialPersonsStates, initialTasksStates] = calcExplicitStates(
    exampleTasks
  )
  const [task, person] = assignStrategyRandom(
    initialTasksStates,
    initialPersonsStates
  )
  const updatedTasks = assign( exampleTasks, task, person )
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

test( "planAssignments() with assignStrategyRandom()", () => {
  const plannedTasks = planAssignments( exampleTasks )
  const [plannedPersonsStates, plannedTasksStates] = calcExplicitStates(
    plannedTasks
  )
  const stats = calcStats( plannedPersonsStates, plannedTasksStates )
  //console.debug(plannedTasksStates)
  //console.debug(plannedPersonsStates)
  console.info( stats )
  expect( stats.maximum - stats.required ).toEqual( stats.reserve - stats.missing )
} )
