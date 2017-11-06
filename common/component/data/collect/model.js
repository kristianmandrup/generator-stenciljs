const {
  BaseCollector
} = require('./_base')

const {
  byConvention
} = require('./_name-conventions')

class Model extends BaseCollector {
  constructor(ctx, opts) {
    super(ctx, opts)
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

  get model() {
    return this._model = this._model || this.buildModel()
  }

  get values() {
    const model = this.model
    model.node = {
      ...this.byConvention()
    }
    model.node.interface.htmlElementName = `HTML${model.className}Element`

    // inside render
    model.tag.content = [
      model.className,
      data.properties.renderProps
    ].filter(txt => !txt.isBlank()).join('\n')

    return model
  }
}
