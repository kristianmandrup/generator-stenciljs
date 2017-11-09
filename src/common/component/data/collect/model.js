const {
  Loggable
} = require('../../../logger')

const {
  byConvention
} = require('./name-convention')

const {
  Tag
} = require('./tag')

function createModel(ctx, opts) {
  return new Model(ctx, opts)
}

class Model extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
  }

  createTag() {
    return new Tag(this.ctx, this.opts)
  }

  get tag() {
    return this._tag = this._tag || this.createTag().values
  }

  componentModel() {
    const name = this.props.name
    const model = {
      component: {
        name: name.camelize(false),
        tag: this.tag,
        className: name.camelize(),
      }
    }
    model.component.containerDir = `${this.componentTargetDir}/${model.component.name}`

    return model
  }

  get componentTargetDir() {
    return this.props.componentTargetDir || 'components'
  }

  get model() {
    return this._model = this._model || this.componentModel()
  }

  get convention() {
    return this.props.convention
  }

  get context() {
    return {
      props: this.props,
      model: this.model
    }
  }

  byConvention() {
    return byConvention(this.context, this.convention)
  }

  get values() {
    const model = this.model
    const conventions = this.byConvention()
    model.node = {
      ...conventions
    }
    model.node.interface.htmlElementName = `HTML${model.className}Element`

    // this.logJson('values: model.node', model.node)

    // inside render
    model.component.tag.content = [
      model.component.className,
    ].filter(txt => !txt.isBlank()).join('\n')

    return model
  }
}

module.exports = {
  createModel,
  Model
}
