const {
  createLogger
} = require('../logger')
const {
  BaseGenerator
} = require('../base')
const {
  BaseComponentGenerator
} = require('./generator')
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

module.exports = {
  createLogger,
  BaseGenerator,
  BaseComponentGenerator,
  buildPrompts,
  createRegistrator,
  createFileCreator,
  collect,
  prepare,
  createArguments,
  createOptions
}
