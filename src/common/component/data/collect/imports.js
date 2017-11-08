const {
  Loggable
} = require('../../../logger')

class Imports extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.props = ctx.props
  }

  // TODO: build from declarations generated!!
  get coreImports() {
    return [this.declarations.allClassNames].join(',')
  }

  get dataServiceImports() {
    if (!this.props.useDataService) return
    return `import { ${model.className}DataService, I${model.className}DataServiceInjector } from './data-service'\n`
  }

  get imports() {
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
