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

  collectAll() {

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
    return this.data.blocks
      .map(block => {
        return Array.isArray(block) ? block.join('\n') : block;
      })
      .filter(txt => {
        console.log('filter', txt)
        return txt && !txt.isBlank()
      }).join('\n')
  }

  // TODO: build from declarations generated!!
  get coreImports() {
    let base = 'Component'
    let declarationClasses = Object.keys(this.decorators).map(name => name.capitalize())
    return [base, ...declarationClasses].join(',')
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
    this.tagName = tagName
    this.className = className

    const {
      componentName,
      componentFileName,
      dtsFileName,
      interfaceFileName,
      styleFileName,
      testFileName
    } = this._byConvention();

    let {
      styleFileExt,
      testFileExt,
      testLib
    } = this.props

    const htmlElementName = `HTML${className}Element`

    // TODO: prompt for path to use
    this.componentDir = `components/${componentName}`

    // inside render
    let displayBlocks = [className, displayProps].filter(txt => !txt.isBlank()).join('\n')

    return {
      tagName,
      className,
      styleFileExt,
      styleFileName,
      wrapperTagName,
      tag,
      declarations,
      displayBlocks,
      dataServiceImports,
      coreImports
    }
  }
}
