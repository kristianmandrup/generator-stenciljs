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

const ctx = {
  props,
  model: mock.data.model
}

const {
  sections
} = prepare

const {
  Properties,
  factories
} = sections

const {
  log
} = console

const {
  createProperties
} = factories

let properties
test.before(done => {
  properties = createProperties(ctx)
})

test('data:prepare createProperties - fails w no props', t => {
  try {
    createProperties({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare Properties - list', t => {
  const list = properties.list
  t.true(Array.isArray(list))
  t.is(list.length, 1)
  const obj = list[0]
  t.is(obj, 'name:string:did')
})

test('data:prepare Properties - obj', t => {
  const obj = properties.obj
  t.is(typeof obj, 'object')
  t.is(obj.name, 'string')
})

test('data:prepare Properties - names', t => {
  const names = properties.names
  t.true(Array.isArray(names))
  t.is(names.length, 1)
  const name = names[0]
  t.is(name, 'name')
})

test('data:prepare Properties - declarations', t => {
  const declarations = properties.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /@Prop/)
})

test('data:prepare Properties - renderProps', t => {
  const renderProps = properties.renderProps
  t.is(typeof renderProps, 'string')
  t.regex(renderProps, /this\.name/)
})

test('data:prepare Properties - decorators', t => {
  const decorators = properties.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators['Prop'])
})

test('data:prepare Properties - values', t => {
  const values = properties.values
  t.is(typeof values, 'object')

  let keys = [
    'obj',
    'list',
    'changeList',
    'names',
    'renderProps',
    'declarations'
  ]

  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare Properties - prepareData', t => {
  const data = properties.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
