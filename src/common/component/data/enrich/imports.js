const {
  Loggable
} = require('../../../logger')

function createImports(ctx, opts) {
  return new Imports(ctx, opts)
}

class Imports extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.props = ctx.props
    this.model = ctx.model
  }

  get declarations() {
    return this.model.declarations
  }

  get allClassNames() {
    return this.declarations.allClassNames
  }

  // TODO: build from declarations generated!!
  get coreImports() {
    return [this.allClassNames].join(',')
  }

  get dataServiceImports() {
    if (!this.props.useDataService) return
    return `import { ${model.className}DataService, I${model.className}DataServiceInjector } from './data-service'\n`
  }

  get all() {
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
