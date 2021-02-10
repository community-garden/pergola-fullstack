import ICAL from "ical.js"
import * as uuid from "uuid"
import {concat} from '../../lib/util'

const exampleEntries = concat([3, 16, 24].map(day =>
                                ({summary: "Baueinsatz",
                                  start: new Date(2021, 1, day, 9, 0),
                                  end: new Date(2021, 1, day, 11, 0),
                                  color: "cornflowerblue"})),
			      [6, 13, 20, 24, 27].map(day =>
                                ({summary: "Workshop Pilzzucht",
                                  start: new Date(2021, 1, day, 11, 0),
                                  end: new Date(2021, 1, day, 15, 0),
                                  color: "bisque"})),
			      [10, 24].map(day =>
                                ({summary: "AG Gemeinschaft & Verantwortung",
                                  start: new Date(2021, 1, day, 18, 0),
                                  color: "deeppink"})),
			      [6, 13, 24, 27].map(day =>
                                ({summary: "AG Imkern",
                                  start: new Date(2021, 1, day, 14, 0),
                                  color: "aquamarine"})))

export async function exampleEventsPublic () {
  const jcal = ["vcalendar",[],
                 exampleEntries.map(e => 
                   ["vevent",concat([["uid",{},"text", uuid.v4()],
                                     ["dtstart",{},"date-time", e.start.toISOString()]],
                                    e.end ? [["dtend",{},"date-time", e.end.toISOString()]] : [],
                                    [["summary",{},"text", e.summary],
                                     ["x-pergola-color",{},"unknown", e.color]]),
                     []])]
  return new ICAL.Component(jcal).toString()
}
