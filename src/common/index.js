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

module.exports = {
  Logger,
  Loggable,
  BaseGenerator,
  BaseComponentGenerator,
  BaseBoilerplateGenerator,
  component,
  boilerplate,
  base
}
