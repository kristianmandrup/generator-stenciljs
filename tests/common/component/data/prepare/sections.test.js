const test = require('ava')
const Sugar = require('sugar');
Sugar.String.extend()

const {
  prepare
} = require('../')

const {
  sections
} = prepare

const {
  log
} = console

log({
  sections
})

const allSections = [
  'properties',
  'apiMethods',
  'changeEventHandlers',
  'states',
  'eventHandlers',
  'lifecycleEventHandlers',
  'emitEventHandlers',
  'listeners',
  'propTests',
  'dataConnect'
].map(name => name.camelize())

log({
  sections,
  allSections
})

test('data: prepare sections', t => {
  allSections.map(name => {
    let section = sections[name]
    // console.log(section)
    t.is(typeof sections[name], 'function')
  })
})
