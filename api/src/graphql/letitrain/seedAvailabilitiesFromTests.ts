import { hasRole } from "keycloak-connect-graphql"

import { exampleTasks } from "../../algo/letitrain/assignment/test-data"
import { neo4jdriver } from "../../config/neo4j"
import { presets } from "../../config/roles"
import { withinTransaction } from "../../lib/neo4j"
import { merge_WateringTask_within_Period } from "./planWateringPeriods"
import { query } from "./setUserAvailability"

async function seedAvailabilitiesFromTests() {
  await withinTransaction( neo4jdriver.session(), ( tx ) => {
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
    exampleTasks.map(
      async ( task ) =>
        await merge_WateringTask_within_Period(
          tx,
          {
            from: exampleTasks[0].date,
            till: exampleTasks[exampleTasks.length - 1].date,
          },
          task.date
        )
    )
  } )
  //return result ? true : false
}

export default {
  resolvers: {
    Mutation: {
      seedAvailabilitiesFromTests: hasRole( presets.deployment_admin )(
        seedAvailabilitiesFromTests
      ),
    },
  },
}
