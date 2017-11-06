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
  constructor(ctx, data, opts = {}) {
    super(opts)
    this.ctx = ctx
    this.generator = ctx.generator
    this.data = data
    this.model = data.model
    this.component = data.model.component
    this.templator = new Templator(generator, data, opts)
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

  componentTplArgs() {
    const {
      component
    } = this
    return {
      template: 'component.tsx.tpl',
      destination: `${component.dir}/${component.fileName}.tsx`
    }
  }

  definitionsTplArgs(opts = {}) {
    const {
      definitions,
      component
    } = this.model
    return {
      template: 'definitions.d.ts.tpl',
      destination: `${component.dir}/${definitions.fileName}.d.ts`
    }
  }

  interfaceTplArgs(opts = {}) {
    const {
      component
    } = this.model
    return {
      template: 'interface.ts.tpl',
      destination: `${component.dir}/${this.model.interface.fileName}.ts`
    }
  }

  stylesTplArgs(opts = {}) {
    const {
      component,
      style
    } = this.model
    return {
      template: `styles/styles.${style.ext}.tpl`,
      destination: `${component.dir}/styles/${style.fileName}.${style.ext}`
    }
  }

  testsTplArgs(opts = {}) {
    const {
      component,
      test
    } = this.model
    return {
      template: `test/${test.lib}.spec.ts.tpl`,
      destination: `${component.dir}/test/${test.fileName}.${test.ext}`
    }
  }

  testsTplArgs(opts = {}) {
    if (!this.props.useDataService) return
    const {
      component
    } = this.model
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
