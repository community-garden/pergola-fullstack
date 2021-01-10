import { hasRole } from "keycloak-connect-graphql"

import { neo4jdriver } from "../../neo4j"

async function seedNeo4jFromJSON() {
  const session = neo4jdriver.session()
  try {
    await session.run( "MATCH (n) DETACH DELETE n" )
    await session.run( "CALL apoc.import.json(\"file:///watering_plan.json\")" )
    await session.run( "MATCH (w:WateringTask) SET w.date = date(w.date)" )
    return true
  } catch ( e ) {
    console.error( e )
    return false
  } finally {
    session.close()
  }
}

const mutations = {
  seedNeo4jFromJSON: hasRole( ["developer"] )( seedNeo4jFromJSON ),
}

export default { mutations }
