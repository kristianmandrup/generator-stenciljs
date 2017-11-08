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
  createTemplateWriter,
  createRegistrator
} = require('./write')

const {
  mock
} = require('./_mock')


module.exports = {
  createLogger,
  BaseGenerator,
  buildPrompts,
  createRegistrator,
  createTemplateWriter,
  collect,
  prepare,
  createDataModel,
  createArguments,
  createOptions,
  mock
}
