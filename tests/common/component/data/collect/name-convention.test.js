const test = require('ava')
const {
  log
} = console

const {
  data,
  mock
} = require('../')

const {
  collect
} = data

log({
  collect
})

const {
  NameConvention,
  byConvention
} = collect

const {
  props
} = mock

const model = mock.data.collected

let ctx = {
  props,
  model
}

let conv
test.before(done => {
  conv = byConvention(ctx, 'name')
})

test('data:collect NameConventions is a class', t => {
  t.is(typeof NameConvention, 'function')
})

test('data:collect conv is an object with stuff', t => {
  t.is(typeof conv, 'object')
  t.is(typeof conv.props, 'object')
  t.is(typeof conv.model, 'object')
  t.is(typeof conv.convention, 'string')
})

const nameKeys = [
  'component',
  'dts',
  'interface',
  'style',
  'test'
]

test('data: collect byName returns map, where each entry has same fileName', t => {
  let names = conv.byName()
  // log({
  //   names
  // })
  t.is(typeof names, 'object')
  nameKeys.map(key => {
    let obj = names[key]
    t.is(typeof obj, 'object')
    t.is(obj.fileName, 'my-component')
  })
})

test('data: collect byType returns map, where each entry has different fileName', t => {
  let names = conv.byType()
  // log('byType', {
  //   names
  // })
  t.is(typeof names, 'object')
  nameKeys.map(key => {
    let obj = names[key]
    t.is(typeof obj, 'object')
    t.not(obj.fileName, 'my-component')
  })
})


test('data: collect decideNames returns map, where each entry has same fileName', t => {
  let names = conv.decideNames()
  t.is(typeof names, 'object')
  nameKeys.map(key => {
    let obj = names[key]
    t.is(typeof obj, 'object')
    t.is(obj.fileName, 'my-component')
  })
})
