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
    tagName = this.props.wrapperTagName || 'div'
    return {
      open: `<${tagName}>`,
      close: `</${tagName}>`
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

  _byConvention() {
    let method = `_by${this.props.convention.capitalize()}`
    let model = this[method]()
    let {
      styleFileExt,
      testFileExt,
      testLib
    } = this.props
    model.style.ext = styleFileExt
    model.test.ext = testFileExt
    model.test.lib = testLib
    return model
  }

  _byName() {
    const name = this.tagName
    const
    const nameMap = {
      component = {
        name,
        fileName: name
      },
      dts: {
        fileName: name,
      },
      interface: {
        fileName: name
      },
      style: {
        fileName: name
      },
      test: {
        fileName: name
      }
    }
    return nameMap
  }

  _byType() {
    const name = this.tagName
    const nameMap = {
      component: {
        name: name,
        fileName: 'component',
      },
      dts: {
        fileName: 'definitions',
      },
      interface: {
        fileName: 'interface'
      },
      style: {
        fileName: 'styles'
      },
      test: {
        fileName: 'unit'
      }
    }
    return nameMap
  }

  get _collectData() {
    const {
      data
    } = this

    const model = {
      props: data.properties,
      name: this.props.name,
      tagName: name.dasherize(),
      className: name.camelize()
    }
    this.model = model
    model.node = {
      ...this._byConvention()
    }
    model.node.interface.htmlElementName = `HTML${model.className}Element`

    // TODO: prompt for path to use
    this.componentDir = `${componentTargetDir}/${model.component.name}`

    const imports = [
      ...dataServiceImports,
      ...coreImports
    ]

    // inside render
    let displayBlocks = [
      model.className,
      displayProps
    ].filter(txt => !txt.isBlank()).join('\n')

    const tag = this.tag

    return {
      model,
      tag,
      declarations,
      displayBlocks,
      imports
    }
  }
}
