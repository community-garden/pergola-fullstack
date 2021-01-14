import { Person, Task } from "../types"

enum P {
  Claudia = "Claudia",
  Franziska = "Franziska",
  Günther = "Günther",
  Jonas = "Jonas",
  Johannes = "Johannes",
  Philipp = "Philipp",
  Sebastian = "Sebastian",
  Stephanie = "Stephanie",
}

const examplePersons: Person[] = [
  { id: P.Claudia, maximum_tasks: 2 },
  { id: P.Franziska, maximum_tasks: 3 },
  { id: P.Günther, maximum_tasks: 3 },
  { id: P.Jonas, maximum_tasks: 3 },
  { id: P.Johannes, maximum_tasks: 1 },
  { id: P.Philipp, maximum_tasks: 2 },
  { id: P.Sebastian, maximum_tasks: 2 },
  { id: P.Stephanie, maximum_tasks: 1 },
]

const exampleTasks: Task<string>[] = [
  {
    date: "2020-01-01",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Claudia, P.Franziska, P.Günther].includes( p.id as P )
    ),
  },
  {
    date: "2020-01-02",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Jonas, P.Johannes, P.Philipp].includes( p.id as P )
    ),
  },
  {
    date: "2020-01-03",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Sebastian, P.Stephanie, P.Claudia].includes( p.id as P )
    ),
  },
  {
    date: "2020-01-04",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Franziska, P.Günther, P.Jonas].includes( p.id as P )
    ),
  },
  {
    date: "2020-01-05",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Johannes, P.Philipp, P.Sebastian].includes( p.id as P )
    ),
  },
  {
    date: "2020-01-06",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Stephanie, P.Claudia, P.Franziska].includes( p.id as P )
    ),
  },
  {
    date: "2020-01-07",
    target_count: 2,
    assigned: [],
    available: examplePersons.filter(( p ) =>
      [P.Günther, P.Jonas, P.Johannes].includes( p.id as P )
    ),
  },
]

export default exampleTasks
