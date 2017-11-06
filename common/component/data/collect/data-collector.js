const {
  byConvention
} = require('./name-conventions')

const {
  createTemplateData
} = require('./template-data')

function createDataCollector(props) {
  return new DataCollector(props)
}

class DataCollector {
  constructor(props) {
    this.props = props
    this.data = this._createTemplateData().buildAll()
  }

  _createTemplateData() {
    return createTemplateData(this.props)
  }

  get componentTargetDir() {
    return this.props.componentTargetDir || 'components'
  }

  get dataServiceImports() {
    if (!this.props.useDataService) return
    return `import { ${model.className}DataService, I${model.className}DataServiceInjector } from './data-service'\n`
  }

  buildTag() {
    const containerTagName = this.props.wrapperTagName || 'div'
    return {
      name: this.props.name.dasherize(),
      open: `<${containerTagName}>`,
      close: `</${containerTagName}>`
    }
  }

  get tag() {
    return this._tag = this._tag || this.buildTag()
  }

  buildDeclarations() {
    return this.data.declarationBlocks
      .map(block => {
        return Array.isArray(block) ? block.join('\n') : block;
      })
      .filter(txt => {
        return txt && !txt.isBlank()
      }).join('\n')
  }

  get declarations() {
    return this._declarations = this._declarations || this.buildDeclarations()
  }

  _byConvention() {
    return byConvention(this.props.convention, this.model)
  }

  get decorators() {
    return this.data.decorators
  }

  get declarationClasses() {
    return this._classes = this._classes || Object.keys(this.decorators).map(name => name.capitalize())
  }

  // TODO: build from declarations generated!!
  get coreImports() {
    return ['Component', ...this.declarationClasses].join(',')
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

  buildModel() {
    const {
      data
    } = this
    const name = this.props.name
    const model = {
      props: data.properties,
      component: {
        name: name.camelize(false),
        tag: this.tag,
        className: name.camelize()
      }
    }

    // TODO: prompt for path to use
    model.componentDir = `${this.componentTargetDir}/${model.component.name}`
    return model
  }

  richModel() {
    const model = this.model
    model.node = {
      ...this._byConvention()
    }
    model.node.interface.htmlElementName = `HTML${model.className}Element`

    // inside render
    model.tag.content = [
      model.className,
      data.properties.renderProps
    ].filter(txt => !txt.isBlank()).join('\n')

    return model
  }

  get model() {
    return this._model = this._model || this.buildModel()
  }

  collectAll() {
    const {
      model,
      declarations,
      imports
    } = this
    return {
      imports,
      model,
      declarations
    }
  }
}

module.exports = {
  createDataCollector,
  DataCollector
}
