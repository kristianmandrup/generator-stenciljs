const {
  Loggable
} = require('../../logger')
const {
  Templator
} = require('./templator')

function createFileCreator(ctx, templateOpts) {
  return new FileCreator(ctx, templateOpts)
}

class FileCreator extends Loggable {
  constructor(generator, data = {}, opts = {}) {
    super(opts)
    this.generator = generator
    this.configure(data)
  }

  configure(data) {
    this.validateData(data)
    this.data = data
    this.model = data.model || {}
    this.templator = new Templator(this.generator, data, this.opts)
  }

  validateData(data) {
    // TODO
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

  createAllFiles() {
    this.eventLog = this.templators.map(name => {
      this.createTemplate(name, this.tplArgs(name))
    })
    return this.eventLog
  }

  createTemplate(name, args) {
    if (!args) {
      return {
        [name]: 'skipped'
      }
    }
    this.templator.createTemplate(args)
    return {
      [name]: 'written'
    }
  }

  tplArgs(name) {
    const entityName = name.camelize(false)
    const args = this[`${entityName}TplArgs`]()
    return {
      ...args,
      data: this.data
    }
  }

  validate(entityName, opts = {}) {
    const entity = this.model[entityName]
    if (!entity) {
      this.handleError(`${entityName} is missing from model`, {
        model: this.model
      })
    }
    opts.props.map(name => {
      if (!entity[name]) {
        this.handleError(`${entityName} missing required ${name} property`, {
          [entityName]: entity
        })
      }
    })
  }

  componentTplArgs() {
    const component = this.validate('component', {
      props: ['dir', 'fileName']
    })
    return {
      template: 'component.tsx.tpl',
      destination: `${component.dir}/${component.fileName}.tsx`
    }
  }

  definitionsTplArgs(opts = {}) {
    const component = this.validate('component', {
      props: ['dir']
    })
    const definitions = this.validate('component', {
      props: ['fileName']
    })
    return {
      template: 'definitions.d.ts.tpl',
      destination: `${component.dir}/${definitions.fileName}.d.ts`
    }
  }

  interfaceTplArgs(opts = {}) {
    const component = this.validate('component', {
      props: ['dir']
    })
    const _interface = this.validate('interface', {
      props: ['fileName']
    })
    return {
      template: 'interface.ts.tpl',
      destination: `${component.dir}/${_interface.fileName}.ts`
    }
  }

  stylesTplArgs(opts = {}) {
    const component = this.validate('component', {
      props: ['dir']
    })
    const _interface = this.validate('style', {
      props: ['fileName', 'ext']
    })
    return {
      template: `styles/styles.${style.ext}.tpl`,
      destination: `${component.dir}/styles/${style.fileName}.${style.ext}`
    }
  }

  testsTplArgs(opts = {}) {
    const component = this.validate('component', {
      props: ['dir']
    })
    const _interface = this.validate('test', {
      props: ['fileName', 'ext', 'lib']
    })
    return {
      template: `test/${test.lib}.spec.ts.tpl`,
      destination: `${component.dir}/test/${test.fileName}.${test.ext}`
    }
  }

  testsTplArgs(opts = {}) {
    if (!this.props.useDataService) return
    const component = this.validate('component', {
      props: ['dir']
    })
    return {
      template: `data-service.ts.tpl`,
      destination: `${component.dir}/data-service.ts`
    }
  }
}

module.exports = {
  createFileCreator,
  FileCreator
}
