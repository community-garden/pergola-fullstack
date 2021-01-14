export interface Person {
  readonly maximum_tasks: number /** how ofter the user wants be assigned at most **/;
  readonly id: string;
}

export interface PersonState extends Person {
  remaining_allowed_tasks: number /** difference between maximum_tasks and number of planed assignments **/;
  remaining_possible_tasks: number /** number of not yet fully assigned tasks to which this person is available **/;
}

export function personListIncludesPerson(
  personList: Person[],
  person: Person | PersonState
): boolean {
  return personList.map(( p ) => p.id ).includes( person.id )
}

export interface Task<date> {
  assigned: Person[];
  readonly available: Person[];
  readonly target_count: number /** how many persons should be assigned **/;
  readonly date: date;
}

export interface TaskState<date> extends Task<date> {
  missing_count: number /** difference between target_count and number of planed assignments **/;
  remaining_possible_persons: number /** number of persons available but unassigned at this task, not already reached maximum_tasks **/;
}

export interface AssignStrategyFn<date> {
  ( tasks: TaskState<date>[], personsStates: PersonState[] ):
    | [Task<date>, Person]
    | null;
}

export interface AssignmentStats {
  tasks: number;
  persons: number;
  required: number /** sum(tasks.target_count) **/;
  maximum: number /** sum(persons.maximum_tasks) **/;
  available: number /** sum(taks.available.length) **/;
  missing: number /** sum(tasks.missing_count) **/;
  reserve: number /** sum(persons.remaining_allowed_tasks) **/;
  optimum: number /** lower bound of achievable missing **/;
}
