const {
  Loggable
} = require('../../../logger')

const {
  byConvention
} = require('./name-convention')

const {
  createModel
} = require('./model')

function createDataCollector(props) {
  return new DataCollector(props)
}

class DataCollector extends Loggable {
  constructor(ctx, opts = {}) {
    super(opts)
    this.props = ctx.props
  }

  get ctx() {
    return {
      data: this.data,
      model: this.model,
      props: this.props
    }
  }

  get model() {
    return this._model = this._model || this.createModel().values
  }

  createModel() {
    const ctx = {
      props: this.props
    }
    console.log('createModel', ctx)
    return createModel(ctx, this.opts)
  }

  get values() {
    const {
      model,
      declarations,
      imports
    } = this
    return {
      model,
      declarations,
      imports
    }
  }
}

module.exports = {
  createDataCollector,
  DataCollector
}
