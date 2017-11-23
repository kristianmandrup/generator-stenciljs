const fs = require('fs')
const mockFs = require('mock-fs')
const test = require('ava')
const {
  write
} = require('../../')

const {
  createTemplator
} = write.template

const ctx = {
  templatePath(filePath) {
    return './templates/' + filePath
  },
  destinationPath(filePath) {
    return './' + filePath
  },
  fs
}
const opts = {}

function mockFiles() {
  mockFs({})
}

const {
  log
} = console

const data = {
  properties: {}
}

let temp
test.before(() => {
  mockFiles()
  temp = createTemplator(ctx, data, opts)
})

test('write: templator', t => {
  t.is(typeof temp, 'object')
  t.is(typeof temp.validator, 'object')
  t.is(temp.data, data)
})
