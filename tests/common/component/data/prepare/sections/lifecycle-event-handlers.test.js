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
  LifecycleEventHandlers,
  factories
} = sections

const {
  log
} = console

log({
  ctx
})

const {
  createLifecycleEventHandlers
} = factories

ctx.props = {
  lifeCycleEvents: ['WillLoad', 'WillUpdate']
}

log({
  lifeCycleEvents: props.lifeCycleEvents
})

let eventHandlers
test.before(done => {
  eventHandlers = createLifecycleEventHandlers(ctx)
})

test('data:prepare createLifecycleEventHandlers - fails w no props', t => {
  try {
    createLifecycleEventHandlers({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare LifecycleEventHandlers - declarations', t => {
  const declarations = eventHandlers.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /component/)
})

test('data:prepare LifecycleEventHandlers - values', t => {
  const values = eventHandlers.values
  t.is(typeof values, 'object')

  let keys = [
    'declarations'
  ]

  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare LifecycleEventHandlers - prepareData', t => {
  const data = eventHandlers.prepareData()
  t.is(typeof data, 'object')
})
