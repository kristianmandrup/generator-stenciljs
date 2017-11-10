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
  Imports,
  createImports
} = enrich

const {
  props
} = mock

let ctx = {
  props,
  data: mock.data.collected
}

let imports
test.before(done => {
  ctx.data.decorators = mock.data.prepared.decorators
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
  const core = imports.coreImports
  t.is(typeof core, 'string')
  t.regex(core, /Component/)
  t.regex(core, /Prop/)
})

test('Imports: dataServiceImports has Component and Prop', t => {
  imports.props.useDataService = true
  const ds = imports.dataServiceImports
  t.is(typeof ds, 'string')
  t.regex(ds, /DataService/)
  t.regex(ds, /DataServiceInjector/)
})


test('Imports: imports has core and dataService imports', t => {
  const code = imports.code
  t.is(typeof code, 'string')
  t.regex(code, /Component/)
  t.regex(code, /DataServiceInjector/)
})
