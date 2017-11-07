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
  }

  createModel() {
    return createDataCollector({
      props: this.props
    }, this.opts)
  }

  createTemplateData() {
    return createDataCollector({
      model: this.model
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
