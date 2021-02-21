import { hasRole } from "keycloak-connect-graphql"

import { exampleTasks } from "../../algo/letitrain/assignment/test-data"
import { neo4jdriver } from "../../config/neo4j"
import { presets } from "../../config/roles"
import { withinTransaction } from "../../lib/neo4j"
import { merge_WateringTask_within_Period } from "./planWateringPeriods"
import { query } from "./setUserAvailability"

const gardenId = "wurzelwerk"

async function seedAvailabilitiesFromTests() {
  const tasks = exampleTasks.simple
  await withinTransaction( neo4jdriver.session(), ( tx ) => {
    tasks.map( async ( task ) =>
      task.available.map(
        async ( person ) =>
          await tx.run( query, {
            gardenId,
            id: person.id,
            label: person.id,
            date: task.date,
          } )
      )
    )
    tasks.map(
      async ( task ) =>
        await merge_WateringTask_within_Period(
          tx,
          gardenId,
          {
            from: tasks[0].date,
            till: tasks[tasks.length - 1].date,
          },
          task.date
        )
    )
  } )
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
