const {
  Loggable
} = require('../../../logger')
const {
  createModel,
  Model
} = require('./model')
const {
  NameConvention,
  byConvention
} = require('./name-convention')
const {
  Declarations
} = require('./declarations')
const {
  Imports
} = require('./imports')
const {
  Tag
} = require('./tag')
const {
  createDataCollector
} = require('./data-collector')

module.exports = {
  Loggable,
  createModel,
  Model,
  Declarations,
  Imports,
  Tag,
  NameConvention,
  byConvention,
  createDataCollector
}
