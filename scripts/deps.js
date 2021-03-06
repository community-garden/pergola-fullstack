const concurrently = require('concurrently')

const { API_DIR, APP_DIR, runner, concurrentOpts } = require('./common')

const jobs = [
  {
    name: 'api',
    command: `cd ${API_DIR} && ${runner} install`,
    prefixColor: 'green',
  },
  {
    name: 'frontend',
    command: `cd ${APP_DIR} && ${runner} install`,
    prefixColor: 'blue',
  },
]

concurrently(jobs, concurrentOpts).catch((e) => {
  console.error(e.message)
})
