const collect = require('./collect')
const prepare = require('./prepare')
const enrich = require('./enrich')
const {
  DataModel,
  createDataModel
} = require('./data-model')

module.exports = {
  collect,
  prepare,
  enrich,
  DataModel,
  createDataModel
}
