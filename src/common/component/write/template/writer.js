const {
  Loggable
} = require('../../../logger')
const {
  Templator
} = require('./templator')
const {
  // TemplateValidator,
  createTemplateValidator
} = require('./validator')

class TemplateWriter extends Loggable {
  constructor(generator, data = {}, opts = {}) {
    super(opts)
    this.data = data
    this.generator = this.validGenerator(generator)
    this.validator = this.createValidator()
    this.configure(data)
  }

  configure(data) {
    this.validateData(data)
    this.model = data.model || {}
    this.templator = new Templator(this.generator, data, this.opts)
  }

  createValidator() {
    return createTemplateValidator({
      data: this.data
    }, this.opts)
  }

  validGenerator(generator) {
    if (!generator.appname) {
      this.handleError('Invalid generator, must have an .appname', {
        generator
      })
    }
    return generator
  }

  // validateEntityData for all entities?
  validateData(data) {
    return this.validator.validateData(data)
  }

  validateEntity(entityName, opts = {}) {
    return this.validator.validateEntity(entityName, opts)
  }

  validateEntityData(name) {
    return this.validator.validateEntityData(name)
  }

  get templators() {
    return [
      'component',
      'definitions',
      'interface',
      'styles',
      'tests',
      'dataService'
    ]
  }

  writeAll() {
    this.eventLog = this.templators.map(name => {
      return this.createTemplate(name, this.tplArgs(name))
    })
    return this.eventLog
  }

  createTemplate(name, args) {
    if (!args) {
      return {
        [name]: 'skipped'
      }
    }
    this.templator.createTemplate(name, args)
    return {
      [name]: 'written'
    }
  }

  tplArgs(name) {
    const entityName = name.camelize(false)
    const argsFunName = `${entityName}TplArgs`
    let argsFun = this[argsFunName]
    if (typeof argsFun !== 'function') {
      this.handleError(`tplArgs: no such template arguments function - ${argsFunName}`, {
        ctx: this,
        entityName,
        argsFunName
      })
    }
    argsFun = argsFun.bind(this)
    const args = argsFun()
    const data = this.validateEntityData(entityName)
    return {
      ...args,
      data
    }
  }

  componentTplArgs() {
    const component = this.validateEntity('component', {
      props: ['containerDir', 'fileName']
    })
    return {
      template: 'component.tsx.tpl',
      destination: `${component.containerDir}/${component.fileName}.tsx`
    }
  }

  definitionsTplArgs() {
    const component = this.validateEntity('component', {
      props: ['containerDir']
    })
    const definitions = this.validateEntity('component', {
      props: ['fileName']
    })
    return {
      template: 'definitions.d.ts.tpl',
      destination: `${component.containerDir}/${definitions.fileName}.d.ts`
    }
  }

  interfaceTplArgs() {
    const component = this.validateEntity('component', {
      props: ['containerDir']
    })
    const _interface = this.validateEntity('interface', {
      props: ['fileName']
    })
    return {
      template: 'interface.ts.tpl',
      destination: `${component.containerDir}/${_interface.fileName}.ts`
    }
  }

  stylesTplArgs() {
    const component = this.validateEntity('component', {
      props: ['containerDir']
    })
    const style = this.validateEntity('styles', {
      props: ['fileName', 'ext']
    })
    return {
      template: `styles/styles.${style.ext}.tpl`,
      destination: `${component.containerDir}/styles/${style.fileName}.${style.ext}`
    }
  }

  testsTplArgs() {
    const component = this.validateEntity('component', {
      props: ['containerDir']
    })
    const test = this.validateEntity('tests', {
      props: ['fileName', 'ext', 'lib', 'propertySpecs']
    })
    return {
      template: `test/${test.lib}.spec.ts.tpl`,
      destination: `${component.containerDir}/test/${test.fileName}.${test.ext}`
    }
  }

  dataServiceTplArgs() {
    if (!this.model.dataService.use) {
      return
    }
    const component = this.validateEntity('component', {
      props: ['containerDir']
    })
    return {
      template: `data-service.ts.tpl`,
      destination: `${component.containerDir}/data-service.ts`
    }
  }
}

function createTemplateWriter(generator, data, opts) {
  return new TemplateWriter(generator, data, opts)
}

module.exports = {
  createTemplateWriter,
  TemplateWriter
}
