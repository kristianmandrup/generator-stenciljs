const test = require('ava')
const {
  data,
  mock
} = require('../')

const {
  collect
} = data

const {
  Tag,
  createTag
} = collect

const {
  log
} = console

const {
  props
} = mock

let ctx = {
  props,
  // model: mock.data.model
}

let tg
test.before(done => {
  tg = createTag(ctx)
})

test('data:collect Tag is a class', t => {
  t.is(typeof Tag, 'function')
})

test('data:collect tag is an object', t => {
  t.is(typeof tg, 'object')
  let tag = tg.values
  t.is(tag.name, 'my-component')
  t.is(tag.open, '<div>')
  t.is(tag.close, '</div>')
})
