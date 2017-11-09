const test = require('ava')
const {
  data,
  mock
} = require('../../')

const {
  prepare
} = data

const {
  props
} = mock

let ctx = {
  props,
  model: mock.data.model
}

const {
  sections
} = prepare

const {
  PropTests,
  factories
} = sections

const {
  log
} = console

log({
  ctx
})

const {
  createPropTests
} = factories

ctx.properties = {
  names: [
    'name',
    'age'
  ]
}

let propTests
test.before(done => {
  propTests = createPropTests(ctx)
})

test('data:prepare createPropTests - fails w no properties', t => {
  try {
    createPropTests({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no properties (ctx) on create')
  }
})

test('data:prepare PropTests - names', t => {
  const names = propTests.names
  t.true(Array.isArray(names))
  t.is(names.length, 2)
  const name = names[0]
  const age = names[1]
  t.is(name, 'name')
  t.is(age, 'age')
})

test('data:prepare PropTests - propertySpecs', t => {
  const specs = propTests.propertySpecs
  t.is(typeof specs, 'string')
  t.regex(specs, /it/)
})

test('data:prepare PropTests - values', t => {
  const values = propTests.values
  t.is(typeof values, 'object')

  let keys = [
    'propertySpecs'
  ]

  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare PropTests - prepareData', t => {
  const data = propTests.prepareData()
  t.is(typeof data, 'object')
})
