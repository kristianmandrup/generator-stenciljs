const {
  ChangeEventHandlers,
  createChangeEventHandlers
} = require('./change-event-handlers')
const {
  ApiMethods,
  createApiMethods
} = require('./api-methods')
const {
  DataConnect,
  createDataConnect
} = require('./data-connect')
const {
  EmitEventHandlers,
  createEmitEventHandlers
} = require('./emit-event-handlers')
const {
  EventHandlers,
  createEventHandlers
} = require('./event-handlers')
const {
  LifecycleEventHandlers,
  createLifecycleEventHandlers
} = require('./lifecycle-event-handlers')
const {
  Listeners,
  createListeners
} = require('./listeners')
const {
  PropTests,
  createPropTests
} = require('./prop-tests')
const {
  Properties,
  createProperties
} = require('./properties')
const {
  States,
  createStates
} = require('./states')

const factories = {
  createProperties,
  createApiMethods,
  createChangeEventHandlers,
  createEmitEventHandlers,
  createEventHandlers,
  createLifecycleEventHandlers,
  createListeners,
  createPropTests,
  createStates,
  createDataConnect
}

module.exports = {
  ApiMethods,
  ChangeEventHandlers,
  DataConnect,
  EmitEventHandlers,
  EventHandlers,
  LifecycleEventHandlers,
  Listeners,
  PropTests,
  Properties,
  States,
  factories
}
