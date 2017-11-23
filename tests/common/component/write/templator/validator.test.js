const test = require('ava')
const {
  write
} = require('../../')

const {
  createTemplateValidator
} = write.template

const {
  log
} = console

const ctx = {
  data: {
    model: {
      component: {
        imports: 'hello',
        tag: {
          name: 'my-component'
        },
        style: './styles/red.scss',
        className: 'MyComponent'
      },
      badone: {

      }
    }
  }
}
const opts = {}

let validator
test.before(() => {
  validator = createTemplateValidator(ctx, opts)
})

const entityName = 'component'
const name = 'component'
const props = [
  'imports'
]

test('write: validator', t => {
  t.is(typeof validator, 'object')
})

test('TemplateValidator - validateEntity - not valid', t => {
  try {
    const opts = {
      props
    }
    validator.validateEntity('badone', opts)
    t.fail('invalid')
  } catch (err) {
    t.pass('should fail')
  }
})

test('TemplateValidator - valid', t => {
  try {
    const opts = {
      props
    }
    validator.validateEntity(entityName, opts)
    t.pass('valid')
  } catch (err) {
    log(err)
    t.fail('should not fail')
  }
})

test('TemplateValidator - valid', t => {
  try {
    validator.validateEntityData(name)
    t.pass('valid')
  } catch (err) {
    t.fail('invalid')
  }
})
