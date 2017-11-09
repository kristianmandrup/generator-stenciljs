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
  Imports,
  createImports
} = collect

const {
  props
} = mock

const model = mock.data.collected

let ctx = {
  props,
  model
}

let imports
test.before(done => {
  imports = createImports(ctx, 'name')
})

test('data:collect Imports is a class', t => {
  t.is(typeof Imports, 'function')
})

test('data:collect imports is an object with stuff', t => {
  t.is(typeof imports, 'object')
  t.is(typeof imports.props, 'object')
})

// TODO: imports must know all the decorators that were used
// so can only be used after prepare phase!!
test('Imports: coreImports has Component and Prop', t => {
  log({
    imports
  })
  const core = imports.coreImports
  t.is(typeof core, 'string')
  t.regex(core, /Component/)
  t.regex(core, /Prop/)
})

test('Imports: dataServiceImports has Component and Prop', t => {
  const ds = imports.dataServiceImports
  t.is(typeof ds, 'string')
  t.regex(ds, /DataService/)
  t.regex(ds, /DataServiceInjector/)
})


test('Imports: imports has core and dataService imports', t => {
  const all = imports.all
  t.is(typeof all, 'string')
  t.regex(all, /Component/)
  t.regex(all, /DataServiceInjector/)
})
