import { hasRole } from "keycloak-connect-graphql"

import { exampleTasks } from "../../algo/letitrain/assignment/test-data"
import { neo4jdriver } from "../../config/neo4j"
import { withinTransaction } from "../../lib/neo4j"
import { query } from "./setUserAvailability"

async function seedAvailabilitiesFromTests() {
  const result = await withinTransaction( neo4jdriver.session(), ( tx ) =>
    exampleTasks.map( async ( task ) =>
      task.available.map(
        async ( person ) =>
          await tx.run( query, {
            id: person.id,
            label: person.id,
            date: task.date,
          } )
      )
    )
  )
  return result ? true : false
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
