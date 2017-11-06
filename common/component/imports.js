const {
  createLogger
} = require('../logger')
const {
  BaseGenerator
} = require('../base')
const {
  buildPrompts
} = require('./prompts')
const {
  createArguments,
  createOptions
} = require('./args')
const {
  collect,
  prepare
} = require('./data')
const {
  createFileCreator
} = require('./write')
const {
  createRegistrator
} = require('./write/registrator')

console.log({
  BaseGenerator
})

module.exports = {
  createLogger,
  BaseGenerator,
  buildPrompts,
  createRegistrator,
  createFileCreator,
  collect,
  prepare,
  createArguments,
  createOptions
}
