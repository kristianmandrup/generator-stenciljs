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
  States,
  factories
} = sections

const {
  log
} = console

const {
  createStates
} = factories

ctx.props = {
  stateStr: 'activate'
}

let states
test.before(done => {
  states = createStates(ctx)
})

test('data:prepare createStates - fails w no props', t => {
  try {
    createStates({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data:prepare States - names', t => {
  const names = states.names
  t.true(Array.isArray(names))
  t.is(names.length, 1)
  const name = names[0]
  t.is(name, 'activate')
})

test('data:prepare States - declarations', t => {
  const declarations = states.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /@State/)
})

test('data:prepare States - decorators', t => {
  const decorators = states.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators['State'])
})

test('data:prepare States - values', t => {
  const values = states.values
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

test('data:prepare States - prepareData', t => {
  const data = states.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
