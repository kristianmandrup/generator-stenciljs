const {
  Logger,
  Loggable
} = require('./logger')

const {
  BaseGenerator
} = require('./base')

const base = require('./base')

const {
  BaseComponentGenerator
} = require('./component')

const component = require('./component')

const {
  BaseBoilerplateGenerator
} = require('./boilerplate')

const boilerplate = require('./boilerplate')

const {
  MockTemplateData
} = require('./mock/template-data')


module.exports = {
  Logger,
  Loggable,
  BaseGenerator,
  BaseComponentGenerator,
  BaseBoilerplateGenerator,
  MockTemplateData,
  component,
  boilerplate,
  base
}
