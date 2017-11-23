const fs = require('fs')
const mockFs = require('mock-fs')
const test = require('ava')
const {
  write
} = require('../../')

const {
  createTemplator
} = write.template

fs.copyTpl = function (template, dest, data) {
  return data
}

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

const data = {
  model: {
    component: {
      imports: 'hello',
      tag: {
        name: 'my-component'
      },
      style: './styles/red.scss',
      className: 'MyComponent'
    },
    interface: {
      className: 'MyComponent',
        fileName: 'component.dts.ts',
        htmlElementName: 'my-component'
    }
  }
}

function mockFiles() {
  mockFs({})
}

const {
  log
} = console

let temp
test.before(() => {
  mockFiles()
  temp = createTemplator(ctx, data, opts)
})

test('write: templator - create', t => {
  t.is(typeof temp, 'object')
  t.is(typeof temp.validator, 'object')
  t.is(temp.data, data)
})

test('Templator: validatePath', t => {
  try {
    const templatePath = './templates'
    temp.validatePath('template', templatePath)
    t.pass('valid')
  } catch (err) {
    log(err)
    t.fail('should not fail')
  }
})

test('write: templator', t => {
  const validator = temp.createValidator()
  t.is(typeof validator, 'object')
})

test('Templator: validateData() - no data fails', t => {
  try {
    temp.validateData()
    t.fail('should not be valid')
  } catch (err) {
    log(err)
    t.pass('should fail')
  }
})

test('Templator: validateData()', t => {
  try {
    const valid = temp.validateData('component', data)
    t.truthy(valid)
  } catch (err) {
    log(err)
    t.fail('should not fail')
  }
})

test('Templator: createTemplate', t => {
  const name = 'properties'
  const template = './template.tpl'
  const destination = './dest'
  const opts = {
    template,
    destination,
    data
  }
  const result = temp.createTemplate(name, opts)
  t.truthy(result.created)
})
