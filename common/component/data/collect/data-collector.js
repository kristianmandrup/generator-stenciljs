const {
  createTemplateData
} = require('./template-data')

const {
  byConvention
} = require('./_name-conventions')

function createDataCollector(props) {
  return new DataCollector(props)
}

class DataCollector extends Loggable {
  constructor(props, opts = {}) {
    super(opts)
    this.props = props
  }

  createTag() {
    return new Tag(this.ctx, this.opts)
  }

  get ctx() {
    return {
      data: this.data,
      model: this.model,
      props: this.props
    }
  }

  get tag() {
    return this._tag = this._tag || this.createTag().values
  }

  // get data() {
  //   return this._data = this._data || this.createTemplateData().buildAll()
  // }

  createTemplateData() {
    return createTemplateData(this.props)
  }

  get decorators() {
    return this.data.decorators
  }

  get model() {
    return this._model = this._model || this.createModel().values
  }

  createModel() {
    return createModel(this.props)
  }


  get componentTargetDir() {
    return this.props.componentTargetDir || 'components'
  }

  byConvention() {
    return byConvention(this.props.convention, this.model)
  }


  collectAll() {
    const vals = {
      model,
      declarations,
      imports
    } = this
    return vals
  }
}

module.exports = {
  createDataCollector,
  DataCollector
}
