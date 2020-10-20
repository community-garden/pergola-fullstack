import { Driver } from "neo4j-driver"

import { logger } from "./index"

const initCypher =
  "CALL apoc.schema.assert({}, {User: [\"userId\"], Business: [\"businessId\"], Review: [\"reviewId\"], Category: [\"name\"]})"
const executeQuery = ( _driver: Driver ) => {
  const session = _driver.session()
  return session
    .writeTransaction(( tx ) => tx.run( initCypher ))
    .then()
    .finally(() => session.close())
}

export const initializeDatabase: ( driver: Driver ) => void = (
  driver: Driver
) => {
  executeQuery( driver ).catch(( error ) => {
    logger.error( error )
    logger.error( "Database initialization failed to complete\n", error.message )
  } )
}
