import { wateringTaskEventsPublic } from "./index"

test( "wateringTaskEvents", async () => {
  expect(await wateringTaskEventsPublic()).toBeTruthy()
})
