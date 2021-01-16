import ICAL from "ical.js"
import * as uuid from "uuid"
import { neo4jdriver } from "../../config/neo4j"
import { withinTransaction, flatten } from "../../lib/neo4j"
import { groupBy } from "../../lib/util"

export async function wateringTasks() {
  const records = (await withinTransaction( neo4jdriver.session(), ( tx ) => {
    return tx.run( "MATCH (t:WateringTask)-[r:assigned]-(u:User) RETURN t,r,u" )
  })).records.map(( r ) => flatten( r ))
  return groupBy(records, r => r.t.date)
}


export async function wateringTaskEventsPublic () {
  const jcal = ["vcalendar",[],
                 Object.entries(await wateringTasks()).map(([k,v]:[string, any[]]) => 
                   ["vevent",[["uid",{},"text", uuid.v4()],
                              ["dtstart",{},"date-time",new Date(k).toISOString()],
                              ["summary",{},"text",v.length+" Gießer"],
                              ["x-pergola-watering-assigned-count",{},"unknown",v.length]],
                     []])]
  return new ICAL.Component(jcal).toString()
}
