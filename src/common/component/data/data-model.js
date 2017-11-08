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

  createTemplateData() {
    const templateData = createTemplateData({
      model: this.model,
      props: this.props
    }, this.opts)
    // this.logJson('template data', templateData)
    return templateData.buildAll()
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
