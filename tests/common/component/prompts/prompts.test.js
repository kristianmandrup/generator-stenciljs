const test = require('ava')
const {
  prompts
} = require('../')

const {
  buildPrompts,
  all
} = prompts

const options = {
  name: 'hello'
}

const defaults = {
  name: 'my-component'
}

// const {
//   log
// } = console

test('prompts: all', t => {
  const objs = all(options, defaults)
  t.is(typeof objs, 'object')
})

const filter = [
  'name'
]

test('prompts: buildPrompts', t => {
  const objs = buildPrompts(options, defaults, filter)
  // log(objs)
  t.is(typeof objs, 'object')
  t.is(objs[0].name, 'name')
})
