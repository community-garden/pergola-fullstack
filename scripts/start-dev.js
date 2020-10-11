const concurrently = require('concurrently')

const { API_DIR, APP_DIR, runner, concurrentOpts } = require('./common')

const jobs = [
  {
    name: 'api',
    command: `cd ${API_DIR} && ${runner} run start:dev`,
    prefixColor: 'green',
  },
  {
    name: 'app',
    command: `cd ${APP_DIR} && ${runner} run start`,
    prefixColor: 'blue',
  },
]

concurrently(jobs, concurrentOpts).catch((e) => {
  console.error(e.message)
})
