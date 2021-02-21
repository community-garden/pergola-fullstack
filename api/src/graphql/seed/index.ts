import { hasRole } from "keycloak-connect-graphql"

import { neo4jdriver } from "../../config/neo4j"
import { presets } from "../../config/roles"

async function seedNeo4jFromJSON() {
  const session = neo4jdriver.session()
  try {
    await session.run( "MATCH (n) DETACH DELETE n" )
    await session.run( "CALL apoc.import.json(\"file:///watering_plan.json\")" )
    await session.run( "MATCH (w:WateringTask) SET w.date = date(w.date)" )
    await session.run( "MATCH (w:WateringPeriod) SET w.from = date(w.from) SET w.to = date(w.to)" )
    return true
  } catch ( e ) {
    console.error( e )
    return false
  } finally {
    session.close()
  }
}

export default {
  resolvers: {
    Mutation: {
      seedNeo4jFromJSON: hasRole( presets.deployment_admin )( seedNeo4jFromJSON ),
    },
  },
  schema: { mutation: [[__dirname, "mutation.schema.graphql"]] },
}
