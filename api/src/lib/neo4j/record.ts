import { Record } from "neo4j-driver"

import { apply, merge } from "../util"

/** flatten the properties of a record **/
export function flatten( record: Record ) {
  return apply(
    merge,
    record.keys.map(( k ) => ( { [k]: record.get( k )?.properties } ))
  )
}
