const {
  Collector
} = require('../collector')

const {
  byConvention
} = require('./name-convention')

const {
  Tag
} = require('./tag')

function createModel(ctx, opts) {
  return new Model(ctx, opts)
}

class Model extends Collector {
  createTag() {
    return new Tag(this.ctx, this.opts)
  }

  get tag() {
    this._tag = this._tag || this.createTag().values
    return this._tag
  }

  get componentModel() {
    const name = this.props.name
    const model = {
      component: {
        name: name.camelize(false),
        tag: this.tag,
        className: name.camelize()
      }
    }
    model.component.containerDir = `${this.componentTargetDir}/${model.component.tag.name}`

    return model
  }

  get componentTargetDir() {
    return this.props.componentTargetDir || 'components'
  }

  get model() {
    return this._model = this._model || this.componentModel
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
    // const conventions = this.byConvention()
    return model
  }
}

module.exports = {
  createModel,
  Model
}
