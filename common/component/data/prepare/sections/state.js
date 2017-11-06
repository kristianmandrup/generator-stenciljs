const {
  BasePrepare
} = require('./base-prepare')

class State extends BasePrepare {
  constructor(model = {}, opts = {}) {
    super(model, opts)
    this.stateStr = props.stateStr
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
    const vals = {
      names,
      decorators,
      declarations
    } = this
    return vals
  }

}
