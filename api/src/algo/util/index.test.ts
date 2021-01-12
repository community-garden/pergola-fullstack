import { groupBy } from "./index"

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
