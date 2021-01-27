import { apply, concat, unique } from "../../../lib/util"
import { assignStrategyStrategic } from "./strategies/strategic"
import {
  AssignmentStats,
  AssignStrategyFn,
  Person,
  personListIncludesPerson,
  PersonState,
  Task,
  TaskState,
} from "./types"
import * as R from 'ramda'

/** This helper function is for testing purposes and used in the first prototype.
 *  In the final implementation it is not required, since the state changes can easily be calculated in every step.
 **/
export function calcExplicitStates<date>(
  tasks: Task<date>[]
): [PersonState[], TaskState<date>[]] {
  const availablePersons: Person[] = unique(
    apply(
      concat,
      tasks.map(( t ) => t.available )
    )
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

export function preassignment_check(
  task: Task<any>,
  person: Person,
  tasksStates: TaskState<any>[],
  personsStates: PersonState[]
) {
  const personState =
    personsStates[personsStates.findIndex(( p ) => p.id == person.id )]
  return (
    personListIncludesPerson( task.available, person ) &&
    !personListIncludesPerson( task.assigned, person ) &&
    personState.remaining_allowed_tasks >= 1
  )
}

export function assign<date>(
  tasks: Task<date>[],
  task: Task<date>,
  person: Person
): Task<date>[] {
  const updatedTasks = tasks.map(( t ) =>
    t.date == task.date ? { ...t, assigned: t.assigned.concat( person ) } : t
  )
  return updatedTasks
}

/** The main planing function **/
export function planAssignments<date>(
  tasks: Task<date>[],
  assignStrategy: AssignStrategyFn<date> = assignStrategyStrategic
): Task<date>[] {
  const [personsStates, tasksStates] = calcExplicitStates( tasks )
  const assignablePersonsStates = personsStates.filter(
    ( p ) => p.remaining_allowed_tasks > 0
  )
  const assignableTasksStates = tasksStates
    .map(( t ) => ( {
      ...t,
      available: assignablePersonsStates.filter(( ps ) =>
        preassignment_check( t, ps, tasksStates, assignablePersonsStates )
      ),
    } ))
    .filter(( t ) => t.missing_count > 0 && t.remaining_possible_persons > 0 )
  const assignment = assignStrategy(
    assignableTasksStates,
    assignablePersonsStates
  )
  if ( !assignment ) return tasks

  const [task, person] = assignment
  const ok = preassignment_check( task, person, tasksStates, personsStates )
  if ( !ok ) {
    console.error(
      "Assignment would contradict constrainst:",
      task.date,
      person.id
    )
    return tasks
  }

  const updatedTasks = assign( tasks, task, person )
  return planAssignments( updatedTasks, assignStrategy )
}

export function calcStats<date>(
  personsStates: PersonState[],
  tasksStates: TaskState<date>[]
): AssignmentStats {
  return {
    tasks: tasksStates.length,
    persons: personsStates.length,
    required: R.sum(tasksStates.map(( t ) => t.target_count )),
    maximum: R.sum(personsStates.map(( p ) => p.maximum_tasks )),
    available: R.sum(tasksStates.map(( t ) => t.available.length )),
    missing: R.sum(tasksStates.map(( t ) => t.missing_count )),
    reserve: R.sum(personsStates.map(( p ) => p.remaining_allowed_tasks )),
    optimum: R.sum(tasksStates.map(( t ) => Math.max( 0, t.target_count - t.available.length )))
  }
}
