const fs = require('fs')
const test = require('ava')
const {
  write
} = require('../../')

const {
  createTemplateWriter
} = write.template

const generator = {
  appname: 'my-component',
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
      containerDir: 'components',
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

let writer
test.before(() => {
  writer = createTemplateWriter(generator, data, opts)
})

test('TemplateWriter: create', t => {
  t.is(typeof writer, 'object')
})

test('TemplateWriter: createValidator()', t => {
  const validator = writer.createValidator()
  t.is(typeof validator, 'object')
})

test('TemplateWriter: createValidator()', t => {
  const validGen = writer.validGenerator(generator)
  t.is(typeof validGen, 'object')
})

test('TemplateWriter: validateData(data)', t => {
  const valid = writer.validateData(data)
  t.truthy(valid)
})

test('TemplateWriter: createTemplate', t => {
  const name = 'component'
  const result = writer.createTemplate(data)
  t.truthy(result)
})

test.only('TemplateWriter: tplArgs(name)', t => {
  const name = 'component'
  const result = writer.tplArgs(name)
  t.truthy(result)
})

test('TemplateWriter: componentTplArgs()', t => {
  const result = writer.componentTplArgs()
  t.truthy(result)
})

test('TemplateWriter: definitionsTplArgs()', t => {
  const result = writer.definitionsTplArgs()
  t.truthy(result)
})

test('TemplateWriter: interfaceTplArgs()', t => {
  const result = writer.interfaceTplArgs()
  t.truthy(result)
})

test('TemplateWriter: stylesTplArgs()', t => {
  const result = writer.stylesTplArgs()
  t.truthy(result)
})

test('TemplateWriter: testsTplArgs()', t => {
  const result = writer.testsTplArgs()
  t.truthy(result)
})

test('TemplateWriter: dataServiceTplArgs()', t => {
  const result = writer.dataServiceTplArgs()
  t.truthy(result)
})

test('TemplateWriter: writeAll()', t => {
  const result = writer.writeAll()
  t.truthy(result)
})
