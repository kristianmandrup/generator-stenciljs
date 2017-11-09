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
  Listeners,
  factories
} = sections

const {
  log
} = console

log({
  ctx
})

const {
  createListeners
} = factories

ctx.props = {
  listenStr: 'activated'
}

let listeners
test.before(done => {
  listeners = createListeners(ctx)
})

test('data:prepare createListeners - fails w no props', t => {
  try {
    createListeners({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare Listeners - names', t => {
  const names = listeners.names
  t.true(Array.isArray(names))
  t.is(names.length, 1)
  const name = names[0]
  t.is(name, 'activated')
})

test('data:prepare Listeners - decorators', t => {
  const decorators = listeners.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators['Listen'])
})

test('data:prepare Listeners - declarations', t => {
  const declarations = listeners.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /@Listen/)
})

test('data:prepare Listeners - values', t => {
  const values = listeners.values
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

test('data:prepare Listeners - prepareData', t => {
  const data = listeners.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
