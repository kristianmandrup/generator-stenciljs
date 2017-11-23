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
test.beforeEach(() => {
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

test('data: createDataCollector', t => {
  const collector = dm.createDataCollector()
  const {
    model
  } = collector
  t.is(typeof model, 'object')
})

test('data: createDataPreparer also creates model', t => {
  dm.createDataPreparer()
  t.is(typeof dm.model, 'object')
})

test('data: createDataPreparer has template data', t => {
  try {
    dm.createDataCollector()
    const data = dm.createDataPreparer()
    const {
      template
    } = data
    t.is(typeof template, 'object')

    const templateNames = [
      'properties',
      'apiMethods',
      'changeEventHandlers',
      'states',
      'eventHandlers',
      'lifecycleEventHandlers',
      'emitEventHandlers',
      'listeners',
      'propTests',
      'dataConnect'
    ]

    // log({
    //   data
    // })
    templateNames.map(name => {
      return t.is(typeof template[name], 'object')
    })

    t.pass('ok since has model')
  } catch (err) {
    t.fail('should not fail')
  }
})
