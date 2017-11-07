const {
  BasePrepare
} = require('./_base')

class State extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.stateStr = this.props.stateStr
  }

  prepareData() {
    this.stateStr ? this.values : {}
  }

  get names() {
    return this._strToList(this.stateStr)
  }

  get declarations() {
    return this.buildBlockObj(states.names, (acc, prop) => {
      let [name, type] = prop.split(':')
      type = type || 'any'
      let stateName = name.camelize(false)
      acc[key] = `  @State() ${stateName}: ${type};`
      return acc
    }).join('\n')
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
  State
}
