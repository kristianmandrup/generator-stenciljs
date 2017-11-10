const test = require('ava')
const {
  data
} = require('../')

const {
  createDataModel,
  DataModel
} = data

const {
  mock
} = require('../')

const {
  props
} = mock

const ctx = {
  props
}

const {
  log
} = console

let dm
test.beforeEach(done => {
  dm = createDataModel(ctx)
})

test('data: createDataModel - must pass props', t => {
  try {
    createDataModel({})
    t.fail('should fail')
  } catch (err) {
    t.pass('fails as expected')
  }
})

test('data: createModel', t => {
  const model = dm.createModel()
  t.pass('ok')
})

test('data: createDataPreparer also creates model', t => {
  dm.createDataPreparer()
  t.is(typeof dm.model, 'object')
})

test('data: createDataPreparer has template data', t => {
  try {
    dm.createModel()
    const data = dm.createDataPreparer()
    t.is(typeof data.templates, 'object')

    t.pass('ok since has model')
  } catch (err) {
    t.fail('should not fail')
  }
})
