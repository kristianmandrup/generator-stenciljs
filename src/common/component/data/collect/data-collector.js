const {
  Collector
} = require('../collector')

const {
  byConvention
} = require('./name-convention')

const {
  createModel
} = require('./model')

function createDataCollector(ctx, opts) {
  return new DataCollector(ctx, opts)
}

class DataCollector extends Collector {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
  }

  get context() {
    return {
      model: this.model,
      props: this.props
    }
  }

  get model() {
    this._model = this._model || this.createModel().values
    return this._model
  }

  createModel() {
    return createModel(this.ctx, this.opts)
  }
}

module.exports = {
  createDataCollector,
  DataCollector
}
