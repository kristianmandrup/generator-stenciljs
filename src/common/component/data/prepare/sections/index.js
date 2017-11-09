const {
  ChangeEventHandlers,
  createChangeEventHandlers
} = require('./change-event-handlers')
const {
  ApiMethods,
  createApiMethods
} = require('./api-methods')
const {
  DataConnect
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
} = require('./lifecycle-event-handlers')
const {
  Listeners,
} = require('./listeners')
const {
  PropTests
} = require('./prop-tests')
const {
  Properties,
  createProperties
} = require('./properties')
const {
  States
} = require('./states')

const factories = {
  createProperties,
  createApiMethods,
  createChangeEventHandlers,
  createEmitEventHandlers,
  createEventHandlers
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
