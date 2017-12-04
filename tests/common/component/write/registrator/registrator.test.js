const fs = require('fs')
const test = require('ava')
const {
  write
} = require('../../')

const {
  registrator
} = write

const {
  createRegistrator
} = registrator

const generator = {
  destinationPath(filePath) {
    return filePath
    // return './' + filePath
  },
  fs
}

const cfg = {
  none: {
    bundles: []
  },
  registered: {
    bundles: [{
      components: ['my-component']
    }]
  }
}

const fileContent = `exports.config = {
  bundles: [{
    components: [
      'fate-wheel',
      'day-fate',
      'day-spinner'
    ]
  }],
  collections: [{
    name: '@stencil/router'
  }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}`

const cfgFile = JSON.stringify(cfg.none)

const mockFs = require('mock-fs')
// const mockRequire = require('mock-require')

function mockNoneRegistered() {
  mockFs({
    'stencil.config.js': fileContent // `exports.config = ${cfgFile}`
  })
}

const cfgFileRegistered = JSON.stringify(cfg.registered)

function mockAlreadyRegistered() {
  mockFs({
    'stencil.config.js': `exports.config = ${cfgFileRegistered}`
  })
}

const opts = {}

let reg
test.before(() => {
  // mockRequire('stencil.config.js', cfgFile)
  reg = createRegistrator(generator, opts)
})

test.beforeEach(() => {
  mockNoneRegistered()
})

test.after(() => {
  mockFs.restore()
  // mockRequire.stop('stencil.config.js')
})

const {
  log
} = console

test('write: Registrator - create', t => {
  t.is(typeof reg, 'object')
})

const stencilFile = /stencil.config.js/

test('write: Registrator - destinationPath', t => {
  const filePath = reg.destinationPath('stencil.config.js')
  t.regex(filePath, stencilFile)
})

test.only('write: Registrator - loadContent', t => {
  const filePath = reg.destinationPath('stencil.config.js')
  const content = reg.loadContent(filePath)
  t.is(typeof content, 'string')
})

test.only('write: Registrator - firstBlock', t => {
  const block = reg.firstBlock
  t.is(typeof block, 'string')
})

test('write: Registrator - convertToJson', t => {
  const block = reg.firstBlock
  const json = reg.convertToJson(block)
  t.is(typeof json, 'object')
})

test('write: Registrator - writeJson', t => {
  const block = reg.firstBlock
  const json = reg.convertToJson(block)
  const written = reg.writeJson('bundles.json', json)
  t.truthy(written)
})

test('write: Registrator - reWriteConfig', t => {
  const written = reg.reWriteConfig()
  t.truthy(written)
})

test('write: Registrator - useExternalJsonReference', t => {
  const rewritten = reg.useExternalJsonReference()
  t.truthy(rewritten)
})

test('write: Registrator - stencilCfgFilePath', t => {
  t.regex(reg.stencilCfgFilePath, stencilFile)
})

function parse(s) {
  return typeof s === 'string' ? JSON.parse(s) : s
}

function compareJson(t, a, b) {
  t.deepEqual(parse(a), parse(b))
}

test('write: Registrator - stencilCfgFile', t => {
  compareJson(t, reg.stencilCfgFile, cfg.none)
})

test('write: Registrator - stencilCfg', t => {
  compareJson(t, reg.stencilCfg, cfg.none)
})

test('write: Registrator - registerInBundle(tagName)', t => {
  const result = reg.registerInBundle('my-component')
  t.true(result.registered)
})

test('write: Registrator - isAlreadyRegistered(tagName) - false', t => {
  const result = reg.isAlreadyRegistered('my-component')
  t.false(result)
})

test('write: Registrator - isAlreadyRegistered(tagName) - true', t => {
  mockAlreadyRegistered()
  const result = reg.isAlreadyRegistered('my-component')
  t.true(result)
})

test('write: Registrator - register(opts = {})', t => {
  const result = reg.register({
    tagName: 'my-component'
  })
  t.true(result.registered)
})
