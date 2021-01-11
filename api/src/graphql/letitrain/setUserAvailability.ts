import { auth } from "keycloak-connect-graphql"
import { Neo4jDateInput } from "neo4j-graphql-js"

import { neo4jdriver } from "../../config/neo4j"
import { neo4jDateInput2iso } from "../../lib/neo4j"

const Mutation = {
  setUserAvailability: auth( async ( _, args, ctx, info ) => {
    const session = neo4jdriver.session()
    const txc = session.beginTransaction()
    try {
      args.dates.forEach( async ( date: Neo4jDateInput ) => {
        txc.run(
          "MERGE (user:User {id: $id}) SET user.label = $label " +
            "MERGE (task:WateringTask {date: date($date)}) SET task.label = $date " +
            "MERGE (user)-[r:available]-(task) " +
            "RETURN user, r, task",
          {
            id: ctx.kauth.accessToken.content.sub,
            label: ctx.kauth.accessToken.content.preferred_username,
            date: neo4jDateInput2iso( date ),
          }
        )
      } )
      await txc.commit()
      return true
    } catch ( e ) {
      console.error( e )
      await txc.rollback()
      return false
    } finally {
      session.close()
    }
  } ),
}

export default { resolvers: { Mutation } }
