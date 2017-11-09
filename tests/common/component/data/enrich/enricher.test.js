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
  Enricher,
  createEnricher
} = enrich

const {
  props
} = mock

let ctx = {
  props,
  data: mock.data
}

let enricher
test.before(done => {
  enricher = createEnricher(ctx, 'name')
})

test('data:collect Enricher is a class', t => {
  t.is(typeof Enricher, 'function')
})

test('data:collect enricher has props and data', t => {
  t.is(typeof enricher, 'object')
  t.is(typeof enricher.props, 'object')
  t.is(typeof enricher.data, 'object')
})

test('Enricher imports', t => {
  const imports = enricher.imports
  const {
    code
  } = imports
  t.is(typeof imports, 'object')
  t.regex(code, /import/)
})

test('Enricher declarations', t => {
  const imports = enricher.imports
  const {
    code
  } = imports
  t.is(typeof imports, 'object')
  t.regex(code, /@stencil/)
  t.regex(code, /import {/)
})
