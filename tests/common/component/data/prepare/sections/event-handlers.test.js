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
  EventHandlers,
  factories
} = sections

const {
  log
} = console

log({
  ctx
})

const {
  createEventHandlers
} = factories

ctx.props = {
  eventStr: 'activate'
}

let eventHandlers
test.before(done => {
  eventHandlers = createEventHandlers(ctx)
})

test('data:prepare createEventHandlers - fails w no props', t => {
  try {
    createEventHandlers({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare EventHandlers - names', t => {
  const names = eventHandlers.names
  t.true(Array.isArray(names))
  t.is(names.length, 1)
  const name = names[0]
  t.is(name, 'activate')
})

test('data:prepare EventHandlers - declarations', t => {
  const declarations = eventHandlers.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /handle/)
})

test('data:prepare EventHandlers - values', t => {
  const values = eventHandlers.values
  t.is(typeof values, 'object')

  let keys = [
    'names',
    'declarations'
  ]

  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare EventHandlers - prepareData', t => {
  const data = eventHandlers.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
