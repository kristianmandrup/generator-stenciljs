const {
  Loggable
} = require('../../../logger')

function createImports(ctx, opts) {
  return new Imports(ctx, opts)
}

class Imports extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
    this.data = ctx.data
  }

  get component() {
    return this.data.component
  }

  get decorators() {
    return this.data.decorators || {}
  }

  get decoratorNames() {
    return Object.keys(this.decorators)
  }

  // TODO: build from declarations generated!!
  get coreImports() {
    return [this.decoratorNames].join(',')
  }

  get dataServiceImports() {
    if (!this.props.useDataService) return
    const {
      className
    } = this.component
    return `import { ${className}DataService, I${className}DataServiceInjector } from './data-service'\n`
  }

  get code() {
    const importsMap = {
      dataService: this.dataServiceImports,
      core: this.coreImports
    }

    return [
      importsMap.dataService,
      `import { ${importsMap.core} } from '@stencil/core'`
    ].join(' ')
  }
}

module.exports = {
  Imports,
  createImports
}
