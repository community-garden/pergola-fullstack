import { apply, concat, groupBy, map_vals, merge } from "./index"

test( "concat", () => {
  expect( concat( [1, 2], undefined, null, [], [3, 4] )).toEqual( [1, 2, 3, 4] )
} )

test( "apply", () => {
  expect( apply( concat, [[1, 2], undefined, null, [], [3, 4]] )).toEqual( [
    1,
    2,
    3,
    4,
  ] )
} )

test( "merge", () => {
  expect( merge( { 1: 2, 3: 7 }, { 3: 4, 5: 6 } )).toEqual( { 1: 2, 3: 4, 5: 6 } )
} )

test( "groupBy", () => {
  expect(
    groupBy(
      [
        [1, 2],
        [3, 4],
        [3, 5],
        [4, 7],
        [3, 6],
      ],
      ( i ) => i[0]
    )
  ).toEqual( {
    1: [[1, 2]],
    3: [
      [3, 4],
      [3, 5],
      [3, 6],
    ],
    4: [[4, 7]],
  } )
} )

test( "map_vals", () => {
  expect( map_vals( { 1: "a", 2: 3 }, JSON.stringify )).toEqual( {
    1: "\"a\"",
    2: "3",
  } )
} )
