import { Person, Task } from "./types"

enum P {
  Claudia = "Claudia",
  Franziska = "Franziska",
  Günter = "Günter",
  Jonas = "Jonas",
  Johannes = "Johannes",
  Philipp = "Philipp",
  Sebastian = "Sebastian",
  Stephanie = "Stephanie",
}

export const examplePersons: Person[] = [
  { id: P.Claudia, maximum_tasks: 2 },
  { id: P.Franziska, maximum_tasks: 3 },
  { id: P.Günter, maximum_tasks: 3 },
  { id: P.Jonas, maximum_tasks: 3 },
  { id: P.Johannes, maximum_tasks: 1 },
  { id: P.Philipp, maximum_tasks: 2 },
  { id: P.Sebastian, maximum_tasks: 2 },
  { id: P.Stephanie, maximum_tasks: 1 },
]

export const exampleTasks: Task<string>[] = [
  {
    date: "Mo",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Claudia, P.Franziska, P.Günter].includes( p.id as P )
    ),
  },
  {
    date: "Di",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Jonas, P.Johannes, P.Philipp].includes( p.id as P )
    ),
  },
  {
    date: "Mi",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Sebastian, P.Stephanie, P.Claudia].includes( p.id as P )
    ),
  },
  {
    date: "Do",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Franziska, P.Günter, P.Jonas].includes( p.id as P )
    ),
  },
  {
    date: "Fr",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Johannes, P.Philipp, P.Sebastian].includes( p.id as P )
    ),
  },
  {
    date: "Sa",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Stephanie, P.Claudia, P.Franziska].includes( p.id as P )
    ),
  },
  {
    date: "So",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Günter, P.Jonas, P.Johannes].includes( p.id as P )
    ),
  },
]
