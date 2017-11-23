const test = require('ava')
const {
  data,
  mock
} = require('../')

const {
  prepare
} = data

const {
  props
} = mock

const component = {
  name: 'my-component',
  className: 'MyComponent',
  tag: {
    name: 'my-component'
  }
}

const ctx = {
  props,
  model: mock.data.model,
  component
}

const {
  createDataPreparer
} = prepare

// const {
//   log
// } = console

let dp
test.before(() => {
  dp = createDataPreparer(ctx)
})

test('data: create DataPreparer - fails w no props', t => {
  try {
    createDataPreparer({
      model: {}
    })
  } catch (err) {
    t.pass('fails with no props')
  }
})

test('data: create DataPreparer - fails w no model', t => {
  try {
    createDataPreparer({
      props: {}
    })
  } catch (err) {
    t.pass('fails with no model')
  }
})

test('DataPreparer: when valid creates object', t => {
  t.is(typeof dp, 'object')
})

test('DataPreparer: declarationBlocks', t => {
  let blocks = dp.declarationBlocks
  t.is(typeof blocks, 'string')
  t.regex(blocks, /DataServiceInjector/)
})

test('DataPreparer: buildApiMethods', t => {
  dp.apiMethods.apiMethodsStr = 'activate'

  dp.buildApiMethods()
  const {
    apiMethods
  } = dp.template
  const {
    declarations
  } = apiMethods
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Event/)
})

test('DataPreparer: buildComponentDataConnect', t => {
  dp.dataConnect.useDataService = true

  dp.buildComponentDataConnect()
  const {
    dataConnect
  } = dp.template
  const {
    declarations
  } = dataConnect
  t.is(typeof declarations, 'string')
  t.regex(declarations, /dataService/)
})

test('DataPreparer: buildChangeEventHandlers', t => {
  dp.buildChangeEventHandlers()
  const {
    changeEventHandlers
  } = dp.template
  const {
    declarations
  } = changeEventHandlers
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Change/)
})

test('DataPreparer: buildLifecycleEventHandlers', t => {
  dp.buildLifecycleEventHandlers()
  const {
    lifecycleEventHandlers
  } = dp.template
  const {
    declarations
  } = lifecycleEventHandlers
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Will/)
})

test('DataPreparer: buildEmitEventHandlers', t => {
  dp.emitEventHandlers.eventEmitStr = 'activate'
  dp.buildEmitEventHandlers()
  const {
    emitEventHandlers
  } = dp.template
  const {
    declarations
  } = emitEventHandlers
  t.is(typeof declarations, 'string')
  t.regex(declarations, /EventEmitter/)
})

test('DataPreparer: buildEventHandlers', t => {
  dp.eventHandlers.eventStr = 'activate'
  dp.buildEventHandlers()
  const {
    eventHandlers
  } = dp.template
  const {
    declarations
  } = eventHandlers
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Event/)
})

test('DataPreparer: buildLifecycleEventHandlers', t => {
  dp.buildLifecycleEventHandlers()
  const {
    lifecycleEventHandlers
  } = dp.template
  const {
    declarations
  } = lifecycleEventHandlers
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Will/)
})

test('DataPreparer: buildListeners', t => {
  dp.listeners.listenStr = 'activate'
  dp.buildListeners()
  const {
    listeners
  } = dp.template
  const {
    declarations
  } = listeners
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Listen/)
})

test('DataPreparer: buildPropertyTests', t => {
  dp.buildPropertyTests()
  const {
    propTests
  } = dp.template
  const {
    propertySpecs
  } = propTests
  t.is(typeof propertySpecs, 'string')
  t.regex(propertySpecs, /it/)
})

test('DataPreparer: buildProperties', t => {
  // dp.properties.propStr = 'age:32:will'
  dp.buildProperties()
  const {
    properties
  } = dp.template
  const {
    declarations
  } = properties
  t.is(typeof declarations, 'string')
  t.regex(declarations, /Prop/)
})

test('DataPreparer: buildStates', t => {
  dp.states.stateStr = 'age:number'
  dp.buildStates()
  const {
    states
  } = dp.template
  const {
    declarations
  } = states
  t.is(typeof declarations, 'string')
  t.regex(declarations, /State/)
})

test('DataPreparer: buildAll', t => {
  try {
    dp.buildAll()
    t.pass('all built')
  } catch (err) {
    t.fail('bad fail')
  }
})
