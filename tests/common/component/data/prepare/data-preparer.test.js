const test = require('ava')
const {
  data,
  mock
} = require('../')

const {
  prepare
} = data

const {
  props
} = mock

const ctx = {
  props,
  model: mock.data.model
}

const {
  createDataPreparer
} = prepare

const {
  log
} = console

log({
  ctx
})

let dp
test.before(done => {
  dp = createDataPreparer(ctx)
})

test('data: prepare createDataPreparer - fails w no props', t => {
  try {
    createDataPreparer({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data: prepare createDataPreparer - fails w no model', t => {
  try {
    createDataPreparer({
      props: {}
    })
  } catch (err) {
    t.pass('fails with no model')
  }
})


test('data: prepare createDataPreparer creates object', t => {
  t.is(typeof dp, 'object')
})
