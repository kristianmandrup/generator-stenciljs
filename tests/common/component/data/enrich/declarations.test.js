const test = require('ava')
const {
  log
} = console

const {
  data,
  mock
} = require('../')

const {
  enrich
} = data

const {
  Declarations,
  createDeclarations
} = enrich

const {
  props
} = mock

const model = mock.data.enriched

// const model = mock.data.collected

let ctx = {
  props,
  data: model
}

let decl
test.before(done => {
  decl = createDeclarations(ctx, 'name')
})

test('data:collect Declarations is a class', t => {
  t.is(typeof Declarations, 'function')
})

test('data:collect decl is an object with stuff', t => {
  t.is(typeof decl, 'object')
  t.is(typeof decl.data, 'object')
})

test('data:collect decl has declarations', t => {
  t.is(typeof decl.declarations, 'object')
})

test('Declarations: code returns decl as code', t => {
  const code = decl.code
  t.is(typeof code, 'string')
  t.regex(code, /Prop/)
})
