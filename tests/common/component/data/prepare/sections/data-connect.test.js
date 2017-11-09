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
  DataConnect,
  factories
} = sections

const {
  log
} = console

log({
  ctx
})

const {
  createDataConnect
} = factories

ctx.props = {
  listenStr: 'activated'
}

let dataConnect
test.before(done => {
  dataConnect = createDataConnect(ctx)
})

test('data:prepare createDataConnect - fails w no props', t => {
  try {
    createDataConnect({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})


test('data:prepare DataConnect - decorators', t => {
  const decorators = dataConnect.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators['Prop'])
})

test('data:prepare DataConnect - declarations', t => {
  const declarations = dataConnect.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /dataService/)
})

test('data:prepare DataConnect - values', t => {
  const values = dataConnect.values
  t.is(typeof values, 'object')

  let keys = [
    'decorators',
    'declarations'
  ]

  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare DataConnect - prepareData', t => {
  const data = dataConnect.prepareData()
  t.is(typeof data, 'object')
  let keys = Object.keys(data)
  t.true(keys.length > 0)
})
