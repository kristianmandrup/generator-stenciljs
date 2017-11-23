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

const cfgFile = JSON.stringify(cfg.none)

const mockFs = require('mock-fs')
// const mockRequire = require('mock-require')

function mockNoneRegistered() {
  mockFs({
    'stencil.config.js': `exports.config = ${cfgFile}`
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

test('write: Registrator - stencilCfgFile', t => {
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
