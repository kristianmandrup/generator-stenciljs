const {
  Logger,
  Loggable
} = require('./logger')

const {
  BaseGenerator
} = require('./base')

const {
  BaseComponentGenerator
} = require('./component')

const {
  BaseBoilerplateGenerator
} = require('./boilerplate')

const {
  MockTemplateData
} = require('./mock/template-data')


module.exports = {
  Logger,
  Loggable,
  BaseGenerator,
  BaseComponentGenerator,
  BaseBoilerplateGenerator,
  MockTemplateData
}
