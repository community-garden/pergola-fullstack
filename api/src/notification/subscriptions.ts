import {neo4jdriver} from "../config/neo4j"
import { PushSubscriptionInput} from "../graphql/types/graphql"
import {withinTransaction} from "../lib/neo4j"


const subscribeQuery = `
  MERGE (user:User {id: $userId}) 
  MERGE (s:NotifySubscription {endpoint: $endpoint}) SET s.key_p256dh = $p256dh, s.key_auth = $auth
  MERGE (user)-[r:subscribe]->(s)
  RETURN s
`

const subscribe =
  ( subscription: PushSubscriptionInput, userId: string ) => {
    const {endpoint, expirationTime, keys: {p256dh, auth}} = subscription

    withinTransaction( neo4jdriver.session(), tx => {
      tx.run( subscribeQuery, {
        userId,
        endpoint, expirationTime, p256dh, auth
      } )
    } )
  }


export default subscribe
