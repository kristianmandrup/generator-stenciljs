const {
  BasePrepare
} = require('./_base')

function createStates(ctx, opts) {
  return new States(ctx, opts)
}

class States extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.stateStr = this.valid('stateStr')
  }

  prepareData() {
    return this.stateStr ? this.values : {}
  }

  get names() {
    return this._strToList(this.stateStr)
  }

  get declarations() {
    return this.buildBlockList(this.names, prop => {
      let [name, type] = prop.split(':')
      type = type || 'any'
      let stateName = name.camelize(false)
      return `  @State() ${stateName}: ${type};`
    })
  }

  get decorators() {
    return {
      State: true
    }
  }

  get values() {
    const {
      names,
      decorators,
      declarations
    } = this
    return {
      names,
      decorators,
      declarations
    }
  }
}

module.exports = {
  States,
  createStates
}
