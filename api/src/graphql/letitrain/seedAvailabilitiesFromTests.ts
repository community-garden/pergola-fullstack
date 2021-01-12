import { hasRole } from "keycloak-connect-graphql"

import { exampleTasks } from "../../algo/letitrain/assignment/test-data"
import { neo4jdriver } from "../../config/neo4j"
import { query } from "./setUserAvailability"

async function seedAvailabilitiesFromTests() {
  const session = neo4jdriver.session()
  const tx = session.beginTransaction()
  try {
    exampleTasks.forEach( async ( task ) => {
      task.available.forEach( async ( person ) => {
        await tx.run( query, {
          id: person.id,
          label: person.id,
          date: task.date,
        } )
      } )
    } )
    await tx.commit()
    return true
  } catch ( e ) {
    console.error( e )
    await tx.rollback()
    return false
  } finally {
    session.close()
  }
}

export default {
  resolvers: {
    Mutation: {
      seedAvailabilitiesFromTests: hasRole( ["developer"] )(
        seedAvailabilitiesFromTests
      ),
    },
  },
}
