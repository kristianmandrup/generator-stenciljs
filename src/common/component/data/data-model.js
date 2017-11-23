const {
  Collector
} = require('./collector')

const {
  createDataCollector
} = require('./collect')

const {
  createDataPreparer
} = require('./prepare')

// const {
//   createEnricher
// } = require('./enrich')

// // Add to final data after prepare!
// const enrich = require('./enrich')

class DataModel extends Collector {
  createDataCollector() {
    const dataCollector = createDataCollector({
      props: this.props
    }, this.opts)

    // this.logJson('collect data model', model)
    return dataCollector
  }

  createDataPreparer() {
    const dataPreparer = createDataPreparer({
      model: this.model,
      props: this.props
    }, this.opts)
    return dataPreparer.buildAll()
  }

  get model() {
    return this.createDataCollector().model
  }

  get data() {
    return this.createDataPreparer().values
  }
}

function createDataModel(ctx, opts) {
  return new DataModel(ctx, opts)
}

module.exports = {
  DataModel,
  createDataModel
}
