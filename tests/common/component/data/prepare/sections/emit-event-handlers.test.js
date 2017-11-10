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
  EmitEventHandlers,
  factories
} = sections

const {
  log
} = console

const {
  createEmitEventHandlers
} = factories

ctx.props = {
  eventEmitStr: 'activate'
}

let emitEventHandlers
test.before(done => {
  emitEventHandlers = createEmitEventHandlers(ctx)
})

test('data:prepare createEmitEventHandlers - fails w no props', t => {
  try {
    createEmitEventHandlers({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare EmitEventHandlers - names', t => {
  const names = emitEventHandlers.names
  t.true(Array.isArray(names))
  t.is(names.length, 1)
  const name = names[0]
  t.is(name, 'activate')
})

test('data:prepare EmitEventHandlers - declarations', t => {
  const declarations = emitEventHandlers.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /@Event/)
})

test('data:prepare EmitEventHandlers - decorators', t => {
  const decorators = emitEventHandlers.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators['Event'])
})

test('data:prepare EmitEventHandlers - values', t => {
  const values = emitEventHandlers.values
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

test('data:prepare EmitEventHandlers - prepareData', t => {
  const data = emitEventHandlers.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
