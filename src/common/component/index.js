const {
  BaseComponentGenerator
} = require('./generator')

const generator = require('./generator')
const args = require('./args')
const data = require('./data')
const prompts = require('./prompts')
const write = require('./write')
const {
  mock
} = require('./_mock')

module.exports = {
  BaseComponentGenerator,
  write,
  prompts,
  data,
  args,
  mock
}
