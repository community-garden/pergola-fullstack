import { concat } from "../../../../lib/util"
import { Person, Task } from "../types"

enum P {
  Anna = "Anna",
  Anne = "Anne",
  B = "B",
  C = "C",
  F = "F",
  K = "K",
  L = "L",
  Mar = "Mar",
  Max = "Max",
  Mi = "Mi",
  Ph = "Ph",
  Pi = "Pi",
  R = "R",
  S = "S",
}

function max_by_name( p: P ) {
  /** The original dateset used as benchmark contains 2 tasks with missing assignments while P.B and P.Ph had been available **/
  if ( p === P.Ph ) return 8
  if ( p === P.B ) return 4

  /** To reproduce an at least as good assignment, we grant the same maximum_tasks for the most busy users **/
  if ( p === P.Mar ) return 11
  if ( p === P.F || p === P.L ) return 8
  if ( p == P.Anne ) return 7
  if ( p === P.Pi || p === P.S ) return 6

  /** There are 6 remaining people and 35 remaining assignments.
   *  Complete assignment would need at least 6 maximum tasks for each of person.
   *  Still complete assignment is unachievable because of the days with missing availabilities. **/
  return 6
}

const examplePersons: Person[] = [
  P.Anna,
  P.Anne,
  P.B,
  P.C,
  P.F,
  P.K,
  P.L,
  P.Mar,
  P.Max,
  P.Mi,
  P.Ph,
  P.Pi,
  P.R,
  P.S,
].map(( p ) => ( { id: p, maximum_tasks: max_by_name( p ) } ))

const exampleTasks: Task<string>[] = [
  { date: "2020-07-01", assigned: [], available: [] },
  {
    date: "2020-07-02",
    assigned: [P.Pi, P.F, P.S],
    available: [P.Anne, P.Ph, P.Anna],
  },
  {
    date: "2020-07-03",
    assigned: [P.Anne, P.Max, P.K],
    available: [P.Ph, P.Anna, P.L],
  },
  { date: "2020-07-04", assigned: [P.Ph, P.Anna, P.L], available: [] },
  { date: "2020-07-05", assigned: [P.Anne, P.Ph, P.L], available: [] },
  {
    date: "2020-07-06",
    assigned: [P.R, P.F, P.S],
    available: [P.Anne, P.Ph, P.Anna, P.L],
  },
  { date: "2020-07-07", assigned: [P.Anne, P.Ph, P.C], available: [] },
  { date: "2020-07-08", assigned: [P.Pi, P.Mi, P.Anna], available: [P.L] },
  { date: "2020-07-09", assigned: [P.S, P.Max, P.L], available: [P.F, P.Ph] },
  { date: "2020-07-10", assigned: [P.F, P.K, P.Mar], available: [] },
  { date: "2020-07-11", assigned: [P.S, P.Mar], available: [] },
  { date: "2020-07-12", assigned: [P.K, P.Mar], available: [] },
  {
    date: "2020-07-13",
    assigned: [P.R, P.F, P.Mi],
    available: [P.Pi, P.S, P.L],
  },
  {
    date: "2020-07-14",
    assigned: [P.Mar, P.K, P.C],
    available: [P.Pi, P.B, P.L],
  },
  { date: "2020-07-15", assigned: [P.B, P.Mar, P.Anna], available: [P.L] },
  { date: "2020-07-16", assigned: [P.F, P.Max, P.Anna], available: [P.L] },
  { date: "2020-07-17", assigned: [P.Pi, P.Anna, P.L], available: [P.F] },
  { date: "2020-07-18", assigned: [P.Anne, P.Mar, P.L], available: [] },
  { date: "2020-07-19", assigned: [P.Anne, P.Mar, P.L], available: [] },
  {
    date: "2020-07-20",
    assigned: [P.R, P.S, P.Ph],
    available: [P.F, P.B, P.L],
  },
  { date: "2020-07-21", assigned: [P.B, P.Mi, P.C], available: [P.Ph, P.L] },
  { date: "2020-07-22", assigned: [P.Pi, P.Max, P.L], available: [P.B, P.Ph] },
  {
    date: "2020-07-23",
    assigned: [P.F, P.S, P.L],
    available: [P.B, P.Mi, P.Ph],
  },
  { date: "2020-07-24", assigned: [P.F, P.Mi], available: [P.B, P.Ph] },
  { date: "2020-07-25", assigned: [P.Anne, P.Mar], available: [P.Ph] },
  { date: "2020-07-26", assigned: [P.Anne, P.Ph], available: [] },
  { date: "2020-07-27", assigned: [P.Pi, P.F, P.Max], available: [P.R, P.B] },
  { date: "2020-07-28", assigned: [P.Pi, P.K, P.C], available: [P.Ph] },
  { date: "2020-07-29", assigned: [P.B, P.Mar, P.Ph], available: [] },
  { date: "2020-07-30", assigned: [P.B, P.Ph, P.Mar], available: [] },
  { date: "2020-07-31", assigned: [P.Ph, P.Mar], available: [] },
].map(( t ) => ( {
  date: t.date,
  assigned: examplePersons.filter(( p ) => t.assigned.includes( p.id as P )),
  available: examplePersons.filter(( p ) =>
    concat( t.available, t.assigned ).includes( p.id as P )
  ),
  target_count: 3,
} ))

export default exampleTasks
