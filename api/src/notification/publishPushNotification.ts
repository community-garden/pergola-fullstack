import webPush from  "web-push"

import {neo4jdriver} from "../config/neo4j"
import {PushMessageInput} from "../graphql/types/graphql"
import {flatten, withinTransaction} from "../lib/neo4j"

const subscriberQuery = `
  MATCH (notifySubscription:NotifySubscription) RETURN notifySubscription
`
const subscriberQueryWithUsers = `
  MATCH (notifySubscription:NotifySubscription)<-[:subscribe]-(u:User)
   WHERE u.id IN $userIds
   RETURN notifySubscription
`
interface SubscriptionRes {
  endpoint: string;
  expirationTime?: number
  key_auth: string;
  key_p256dh: string;
}

const publishPushNotification: ( message: PushMessageInput, userIds?: string[] ) => Promise<any> = async ( message, userIds ) => {

  const query = userIds?.length > 0 ? subscriberQueryWithUsers : subscriberQuery
  const params = { userIds }
  const result = await withinTransaction( neo4jdriver.session(), tx => tx.run( query, params  ))

  try {
    const subscribers = result.records
      .map( flatten )
      .map(( { notifySubscription } ) => notifySubscription as SubscriptionRes )
      .map(( { endpoint, key_auth, key_p256dh } ) => ( { endpoint, keys: { auth: key_auth, p256dh: key_p256dh}} ))

    return  await Promise.all(
      subscribers.map( s => {
        webPush.sendNotification( s, JSON.stringify( {
          title: message.title
        } ))
    } ))


  } catch ( e ) {
    console.error( "cannot publish a push message", e )
  }
}

export default publishPushNotification


