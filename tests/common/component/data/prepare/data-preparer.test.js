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

test('data: create DataPreparer - fails w no props', t => {
  try {
    createDataPreparer({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data: create DataPreparer - fails w no model', t => {
  try {
    createDataPreparer({
      props: {}
    })
  } catch (err) {
    t.pass('fails with no model')
  }
})


test('DataPreparer: when valid creates object', t => {
  t.is(typeof dp, 'object')
})

test('DataPreparer: declarationBlocks', t => {
  let blocks = dp.declarationBlocks
  t.is(typeof blocks, 'string')
  t.regex(blocks, /DataServiceInjector/)
})

test('DataPreparer: buildPropertyTests', t => {
  dp.buildPropertyTests()
  const {
    tests
  } = dp.template
  const {
    propertySpecs
  } = tests
  t.is(typeof propertySpecs, 'string')
  t.regex(propertySpecs, /it/)
})

test('DataPreparer: buildApiMethods', t => {
  dp.apiMethods.apiMethodsStr = 'activate'

  dp.buildApiMethods()
  const {
    apiMethods
  } = dp.template
  const {
    declarations
  } = apiMethods
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Event/)
})


test('DataPreparer: buildComponentDataConnect', t => {
  dp.dataConnect.useDataService = true

  dp.buildComponentDataConnect()
  const {
    componentDataConnect
  } = dp.template
  const {
    declarations
  } = componentDataConnect
  log({
    componentDataConnect,
    declarations
  })
  t.is(typeof declarations, 'string')
  t.regex(declarations, /dataService/)
})
