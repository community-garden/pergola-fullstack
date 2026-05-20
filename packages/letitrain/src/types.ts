export interface Person {
  readonly maximum_tasks: number;
  readonly id: string;
}

export interface PersonState extends Person {
  remaining_allowed_tasks: number;
  remaining_possible_tasks: number;
}

export function personListIncludesPerson(
  personList: Person[],
  person: Person | PersonState
): boolean {
  return personList.map((p) => p.id).includes(person.id)
}

export interface Task<date> {
  assigned: Person[];
  readonly available: Person[];
  readonly target_count: number;
  readonly date: date;
}

export interface TaskState<date> extends Task<date> {
  missing_count: number;
  remaining_possible_persons: number;
}

export interface AssignStrategyFn<date> {
  (tasks: TaskState<date>[], personsStates: PersonState[]):
    | [Task<date>, Person]
    | null;
}

export interface AssignmentStats {
  tasks: number;
  persons: number;
  required: number;
  maximum: number;
  available: number;
  missing: number;
  reserve: number;
  optimum: number;
}
