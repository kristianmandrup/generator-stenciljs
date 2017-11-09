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
  t.fail('todo')
})

test('Model: createTag', t => {
  t.fail('todo')
})

test('Model: tag', t => {
  t.fail('todo')
})

test('Model: componentModel', t => {
  t.fail('todo')
})

test('Model: componentTargetDir', t => {
  t.fail('todo')
})

test('Model: model', t => {
  t.fail('todo')
})

test('Model: convention', t => {
  t.fail('todo')
})

test('Model: context', t => {
  t.fail('todo')
})

test('Model: byConvention', t => {
  t.fail('todo')
})

test('Model: values', t => {
  t.fail('todo')
})
