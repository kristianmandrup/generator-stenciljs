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

const {
  Declarations,
  createDeclarations
} = collect

const {
  props
} = mock

// const model = mock.data.collected

let ctx = {
  props,
  // model
}

let declarations
test.before(done => {
  declarations = createDeclarations(ctx, 'name')
})

test('data:collect Declarations is a class', t => {
  t.is(typeof Declarations, 'function')
})

test('data:collect declarations is an object with stuff', t => {
  t.is(typeof declarations, 'object')
  t.is(typeof declarations.props, 'object')
})

test('Declarations: values returns object w allClassNames and declarationCode', t => {
  const values = declarations.values
  t.is(typeof values, 'object')
  t.regex(typeof values.allClassNames, 'object')
  t.regex(typeof values.declarationCode, 'string')
})
