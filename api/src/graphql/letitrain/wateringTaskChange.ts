import { PubSub } from "apollo-server-express"

import {SubscriptionResolvers} from "../types/graphql"

const pubsub = new PubSub()
const TOPIC = "WATERING_TASK_CHANGE"


export const publishChange = () => {
  pubsub.publish( TOPIC, {WateringTaskChange: true} )
}


const { WateringTaskChange } : SubscriptionResolvers = {
  WateringTaskChange: {
    //@ts-ignore
    subscribe: async () => pubsub.asyncIterator( TOPIC )
  }
}

export default { resolvers: { Subscription: { WateringTaskChange} } }
