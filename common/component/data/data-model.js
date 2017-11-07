const {
  Loggable
} = require('../../logger')

const {
  createDataCollector
} = require('./collect')

const {
  createTemplateData
} = require('./prepare')


function createDataModel(ctx, opts) {
  return new DataModel(ctx, opts)
}

class DataModel extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
  }

  createModel() {
    if (!this.props) {
      this.handleError('createModel: missing props', {
        ctx: this.ctx
      })
    }

    return createDataCollector({
      props: this.props
    }, this.opts)
  }

  createTemplateData() {
    if (!this.model) {
      this.handleError('createModel: missing model', {
        ctx: this.ctx
      })
    }

    return createDataCollector({
      model: this.model,
      props: this.props
    }, this.opts)
  }

  get model() {
    return this.createModel().values
  }

  get data() {
    return this.createTemplateData().values
  }
}

module.exports = {
  DataModel,
  createDataModel
}
