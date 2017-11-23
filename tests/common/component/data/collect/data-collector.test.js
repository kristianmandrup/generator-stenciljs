const test = require('ava')
const {
  data
} = require('../')

const {
  collect
} = data

const {
  createDataCollector
} = collect

const ctx = {
  props: {
    name: 'my-component'
  }
}
const opts = {}
const {
  log
} = console

let coll
test.before(() => {
  coll = createDataCollector(ctx, opts)
})

test('data: DataCollector create', t => {
  t.is(typeof coll, 'object')
})

test('data: DataCollector create - fails if no props', t => {
  const badCtx = {}
  t.throws(() => createDataCollector(badCtx))
})

test('data: DataCollector - model', t => {
  const {
    model
  } = coll
  // log({
  //   model
  // })
  t.is(typeof model, 'object')
})

test('data: DataCollector - context', t => {
  const {
    context
  } = coll
  const {
    model
  } = context
  const {
    component
  } = model
  // log({
  //   context,
  //   model,
  //   component
  // })

  t.is(typeof context, 'object')
  t.is(typeof model, 'object')

  t.is(typeof component, 'object')

  const {
    name,
    tag,
    className,
    containerDir
  } = component

  t.is(name, 'myComponent')
  t.is(tag.name, 'my-component')
  t.is(className, 'MyComponent')
  t.is(containerDir, 'components/my-component')
})
