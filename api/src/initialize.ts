import { Driver } from 'neo4j-driver'
import { logger } from './index'

export const initializeDatabase = (driver: Driver) => {
  const initCypher = `CALL apoc.schema.assert({}, {User: ["userId"], Business: ["businessId"], Review: ["reviewId"], Category: ["name"]})`

  const executeQuery = (_driver: Driver) => {
    const session = driver.session()
    return session
      .writeTransaction((tx) => tx.run(initCypher))
      .then()
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => {
    logger.error('Database initialization failed to complete\n', error.message)
  })
}
