const {
  BaseCollector
} = require('./_base')

const {
  byConvention
} = require('./name-convention')

function createModel(ctx, opts) {
  return new Model(ctx, opts)
}

class Model extends BaseCollector {
  constructor(ctx, opts) {
    super(ctx, opts)
  }

  componentModel() {
    const name = this.props.name
    const model = {
      component: {
        name: name.camelize(false),
        tag: this.tag,
        className: name.camelize(),
        containerDir: `${this.componentTargetDir}/${model.component.name}`
      }
    }
    return model
  }

  get componentTargetDir() {
    return this.props.componentTargetDir || 'components'
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
    ].filter(txt => !txt.isBlank()).join('\n')

    return model
  }
}

module.exports = {
  createModel,
  Model
}
