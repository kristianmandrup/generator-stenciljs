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
  ApiMethods,
  factories
} = sections

const {
  log
} = console

const {
  createApiMethods
} = factories

ctx.props = {
  apiMethodsStr: 'activate'
}

let apiMethods
test.before(done => {
  apiMethods = createApiMethods(ctx)
})

test('data:prepare createApiMethods - fails w no props', t => {
  try {
    createApiMethods({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare ApiMethods - names', t => {
  const names = apiMethods.names
  t.true(Array.isArray(names))
  t.is(names.length, 1)
  const name = names[0]
  t.is(name, 'activate')
})

test('data:prepare ApiMethods - declarations', t => {
  const declarations = apiMethods.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /@Event/)
})

test('data:prepare ApiMethods - decorators', t => {
  const decorators = apiMethods.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators['Event'])
})

test('data:prepare ApiMethods - values', t => {
  const values = apiMethods.values
  t.is(typeof values, 'object')

  let keys = [
    'names',
    'decorators',
    'declarations'
  ]

  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare ApiMethods - prepareData', t => {
  const data = apiMethods.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
