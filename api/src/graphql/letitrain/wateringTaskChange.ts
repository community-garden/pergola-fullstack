import {SubscriptionResolvers} from "../types/graphql"

//const pubsub = new PubSub()
const TOPIC = "WATERING_TASK_CHANGE"


export const publishChange = () => {
  console.warn( "publishing currently disabled until a replacement for the deprecated apollo-server PubSub is found" )
  //pubsub.publish( TOPIC, {WateringTaskChange: true} )
}

const { WateringTaskChange } : SubscriptionResolvers = {
  WateringTaskChange: {
  // @ts-ignore
   subscribe: async () => console.warn( "subscription currently disabled until a replacement for the deprecated apollo-server PubSub is found" )
  }
}

export default { resolvers: { Subscription: { WateringTaskChange} } }
