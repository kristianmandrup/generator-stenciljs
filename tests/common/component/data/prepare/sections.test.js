const test = require('ava')
const Sugar = require('sugar');
Sugar.String.extend()

const {
  data
} = require('../../')

const {
  prepare
} = data

const {
  sections
} = prepare

// const {
//   log
// } = console

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

test('data: prepare sections', t => {
  allSections.map(name => {
    const section = sections[name]
    // console.log(section)
    t.is(typeof section, 'function')
    return true
  })
})
