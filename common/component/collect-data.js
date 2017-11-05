import {
  byConvention
} from './name-conventions'

export function CollectData(props) {
  return new CollectData(props)
}

export class CollectData {
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

  get tag() {
    const containerTagName = this.props.wrapperTagName || 'div'
    return {
      name: this.name.dasherize(),
      open: `<${containerTagName}>`,
      close: `</${containerTagName}>`
    }
  }

  get declarations() {
    return this.data.declarationBlocks
      .map(block => {
        return Array.isArray(block) ? block.join('\n') : block;
      })
      .filter(txt => {
        return txt && !txt.isBlank()
      }).join('\n')
  }

  _byConvention() {
    return byConvention(this.props.convention, this.model)
  }

  get decorators() {
    return this.data.decorators
  }

  get declarationClasses() {
    return Object.keys(this.decorators).map(name => name.capitalize())
  }

  // TODO: build from declarations generated!!
  get coreImports() {
    return ['Component', ...this.declarationClasses].join(',')
  }

  get _collectData() {
    const {
      data
    } = this

    const model = {
      props: data.properties,
      name: this.props.name,
      tag: this.tag,
      className: name.camelize()
    }
    this.model = model
    model.node = {
      ...this._byConvention()
    }
    model.node.interface.htmlElementName = `HTML${model.className}Element`

    // TODO: prompt for path to use
    this.componentDir = `${componentTargetDir}/${model.component.name}`

    const imports = {
      dataService: dataServiceImports,
      core: coreImports
    }

    const imports = [
      imports.dataService,
      `import { ${imports.core} } from '@stencil/core'`
    ].join(' ')

    // inside render
    model.tag.content = [
      model.className,
      displayProps
    ].filter(txt => !txt.isBlank()).join('\n')

    return {
      model,
      declarations,
      imports
    }
  }
}
