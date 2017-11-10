const test = require('ava')
const {
  data,
  mock
} = require('../')

const {
  collect
} = data

const {
  Model,
  createModel
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

let mdl
test.before(done => {
  mdl = createModel(ctx)
})

test('data: collect Model', t => {
  t.is(typeof mdl, 'object')
})

test('Model: createTag creates a tag object', t => {
  let tag = mdl.createTag()
  t.is(typeof tag, 'object')
})

test('Model: tag is an object', t => {
  let tag = mdl.tag
  t.is(typeof tag, 'object')
})

test('Model: componentModel', t => {
  let model = mdl.componentModel
  t.is(typeof model, 'object')
})

test('Model: componentTargetDir', t => {
  let dir = mdl.componentTargetDir
  t.is(typeof dir, 'string')
})

test('Model: model', t => {
  let model = mdl.model
  t.is(typeof model, 'object')
})

test('Model: convention', t => {
  let convName = mdl.convention
  t.is(typeof convName, 'string')
  t.is(convName, 'type')
})

test('Model: context', t => {
  let ctx = mdl.context
  t.is(typeof ctx.props, 'object')
  t.is(typeof ctx.model, 'object')
})

test('Model: byConvention', t => {
  let convention = mdl.byConvention()
  t.is(typeof convention, 'object')
})

test('Model: values', t => {
  let values = mdl.values
  t.is(typeof values, 'object')
})
