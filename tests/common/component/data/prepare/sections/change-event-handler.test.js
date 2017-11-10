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
  // ChangeEventHandlers,
  factories
} = sections

// const {
//   log
// } = console

const {
  createChangeEventHandlers
} = factories

let changeEventHandlers
test.before(() => {
  changeEventHandlers = createChangeEventHandlers(ctx)
})

const changeList = [{
  name: 'name',
  type: 'string',
  when: 'did'
}]

test('data:prepare ChangeEventHandlers - prepareData', t => {
  changeEventHandlers.prepareData(changeList)
  const declarations = changeEventHandlers.declarations
  t.is(typeof declarations, 'string')
  t.regex(declarations, /@PropDidChange/)

  const decorators = changeEventHandlers.decorators
  t.is(typeof decorators, 'object')
  t.true(decorators.PropDidChange)
})

test('data:prepare ChangeEventHandlers - values', t => {
  changeEventHandlers.prepareData(changeList)
  const values = changeEventHandlers.values
  t.is(typeof values, 'object')

  const keys = [
    'decorators',
    'declarations'
  ]
  keys.map(key => {
    t.truthy(values[key])
  })
})

test('data:prepare ChangeEventHandlers - prepareData', t => {
  const data = changeEventHandlers.prepareData(changeList)
  t.is(typeof data, 'object')
  t.truthy(data.decorators.PropDidChange)
})
