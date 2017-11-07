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
  prepare,
  createDataModel
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
  buildPrompts,
  createRegistrator,
  createFileCreator,
  collect,
  prepare,
  createDataModel,
  createArguments,
  createOptions
}
