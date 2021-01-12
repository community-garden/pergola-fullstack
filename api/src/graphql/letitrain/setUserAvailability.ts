import { auth } from "keycloak-connect-graphql"
import { Neo4jDateInput } from "neo4j-graphql-js"

import { neo4jdriver } from "../../config/neo4j"
import { neo4jDateInput2iso } from "../../lib/neo4j"

export const query =
  "MERGE (user:User {id: $id}) SET user.label = $label " +
  "MERGE (task:WateringTask {date: date($date)}) SET task.label = $date " +
  "MERGE (user)-[r:available]-(task) " +
  "RETURN user, r, task"

const Mutation = {
  setUserAvailability: auth( async ( _, args, ctx, info ) => {
    const session = neo4jdriver.session()
    const tx = session.beginTransaction()
    try {
      args.dates.forEach( async ( date: Neo4jDateInput ) => {
        tx.run( query, {
          id: ctx.kauth.accessToken.content.sub,
          label: ctx.kauth.accessToken.content.preferred_username,
          date: neo4jDateInput2iso( date ),
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
  } ),
}

export default { resolvers: { Mutation } }
