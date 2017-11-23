const test = require('ava')
const {
  write
} = require('../../')

const {
  createTemplateValidator
} = write.template

const {
  log
} = console

const ctx = {
  data: {
    model: {}
  }
}
const opts = {}

let validator
test.before(() => {
  validator = createTemplateValidator(ctx, opts)
})

test('write: validator', t => {
  t.is(typeof validator, 'object')
})
