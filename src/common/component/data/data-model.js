const {
  Loggable
} = require('../../logger')

const {
  createDataCollector
} = require('./collect')

const {
  createDataPreparer
} = require('./prepare')

const {
  createEnricher
} = require('./enrich')

// Add to final data after prepare!
const enrich = require('./enrich')

function createDataModel(ctx, opts) {
  return new DataModel(ctx, opts)
}

class DataModel extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
    this.validate()
  }

  validate() {
    if (!this.props) {
      this.handleError('createModel: missing props', {
        ctx: this.ctx
      })
    }
  }

  createModel() {
    const model = createDataCollector({
      props: this.props
    }, this.opts)

    // this.logJson('collect data model', model)
    return model
  }

  createDataPreparer() {
    const dataPreparer = createDataPreparer({
      model: this.model,
      props: this.props
    }, this.opts)
    return dataPreparer.buildAll()
  }

  get model() {
    return this.createModel().values
  }

  get data() {
    return this.createDataPreparer().values
  }
}

module.exports = {
  DataModel,
  createDataModel
}
