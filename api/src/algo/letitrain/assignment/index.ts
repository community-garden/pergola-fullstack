import { assert } from "console"

import { assignStrategyRandom } from "./strategies/random"
import {
  AssignmentStats,
  AssignStrategyFn,
  Person,
  personListIncludesPerson,
  PersonState,
  Task,
  TaskState,
} from "./types"
import { concat,unique } from "./util"

/** This helper function is for testing purposes and used in the first prototype.
 *  In the final implementation it is not required, since the state changes can easily be calculated in every step.
 **/
export function calcExplicitStates<date>(
  tasks: Task<date>[]
): [PersonState[], TaskState<date>[]] {
  const availablePersons: Person[] = unique(
    concat( tasks.map(( t ) => t.available ))
  )
  const availablePersonsStates: PersonState[] = availablePersons.map(
    ( person ) => ( {
      ...person,
      remaining_allowed_tasks:
        person.maximum_tasks -
        tasks.filter(( t ) => personListIncludesPerson( t.assigned, person ))
          .length,
      remaining_possible_tasks: tasks.filter(
        ( t ) =>
          personListIncludesPerson( t.available, person ) &&
          !personListIncludesPerson( t.assigned, person ) &&
          t.assigned.length != t.target_count
      ).length,
    } )
  )
  const tasksStates: TaskState<date>[] = tasks.map(( task ) => ( {
    ...task,
    missing_count: task.target_count - task.assigned.length,
    remaining_possible_persons: availablePersonsStates.filter(
      ( p ) =>
        personListIncludesPerson( task.available, p ) &&
        !personListIncludesPerson( task.assigned, p ) &&
        p.remaining_allowed_tasks != 0
    ).length,
  } ))
  return [availablePersonsStates, tasksStates]
}

export function assign<date>(
  tasks: Task<date>[],
  task: Task<date>,
  person: Person
): Task<date>[] {
  assert( personListIncludesPerson( task.available, person ))
  assert( !personListIncludesPerson( task.assigned, person ))
  const updatedTasks = tasks.map(( t ) =>
    t.date == task.date ? { ...t, assigned: t.assigned.concat( person ) } : t
  )
  return updatedTasks
}

/** The main planing function **/
export function planAssignments<date>(
  tasks: Task<date>[],
  assignStrategy: AssignStrategyFn<date> = assignStrategyRandom
): Task<date>[] {
  const [personsStates, tasksStates] = calcExplicitStates( tasks )
  const assignment = assignStrategy( tasksStates, personsStates )
  /** when implementing more strategies, we might want check here, whether the assignment is valid **/
  if ( !assignment ) return tasks
  else {
    const [task, person] = assignment
    const updatedTasks = assign( tasks, task, person )
    return planAssignments( updatedTasks, assignStrategy )
  }
}

export function calcStats<date>(
  personsStates: PersonState[],
  tasksStates: TaskState<date>[]
): AssignmentStats {
  return {
    tasks: tasksStates.length,
    persons: personsStates.length,
    required: tasksStates
      .map(( t ) => t.target_count )
      .reduce(( sum, n ) => sum + n ),
    maximum: personsStates
      .map(( p ) => p.maximum_tasks )
      .reduce(( sum, n ) => sum + n ),
    available: tasksStates
      .map(( t ) => t.available.length )
      .reduce(( sum, n ) => sum + n ),
    missing: tasksStates
      .map(( t ) => t.missing_count )
      .reduce(( sum, n ) => sum + n ),
    reserve: personsStates
      .map(( p ) => p.remaining_allowed_tasks )
      .reduce(( sum, n ) => sum + n ),
  }
}
