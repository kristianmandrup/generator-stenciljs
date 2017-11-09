const collected = require('./collected')
const prepared = require('./prepared')
const enriched = require('./enriched')

const model = {
  collected,
  prepared,
  enriched
}

module.exports = {
  collected,
  prepared,
  enriched,
  model
}
