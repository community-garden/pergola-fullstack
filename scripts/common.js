const path = require('path')
const execa = require('execa')

const API_DIR = path.join(__dirname, '../api')
const APP_DIR = path.join(__dirname, `../frontend`)

const shouldUseYarn = () => {
  try {
    execa.sync('yarnpkg', ['--version'])
    return true
  } catch (e) {
    return false
  }
}

const runner = shouldUseYarn() ? 'yarn' : 'npm'

const concurrentOpts = {
  restartTries: 3,
  prefix: '{time} {name} |',
  timestampFormat: 'HH:mm:ss',
}

module.exports = {
  concurrentOpts,
  runner,
  API_DIR,
  APP_DIR,
}
