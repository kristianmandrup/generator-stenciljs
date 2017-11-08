const test = require('ava')
const {
  args
} = require('../')

const {
  createArguments,
  createOptions
} = args

const ctx = {
  argument() {
    // noop
  },
  option() {
    // noop
  }
}

test('args: createArguments', t => {
  createArguments(ctx)
  t.pass('ok')
})

test('args: createArguments', t => {
  createOptions(ctx)
  t.pass('ok')
})
