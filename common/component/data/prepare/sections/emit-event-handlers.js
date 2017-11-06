const {
  BasePrepare
} = require('./base-prepare')

class LifecycleEventHandlers extends BasePrepare {
  constructor({
    model,
    props
  }, opts = {}) {
    super(model, opts)
    this.eventEmitStr = props
  }

  prepareData() {
    return this.eventEmitStr ? {} : this.values
  }

  get declarations() {
    return this.buildBlockList(this.names, eventName => {
      return `@Event() ${eventName.camelize()}: EventEmitter`
    })
  }

  get decorators() {
    return {
      Event: true
    }
  }

  get names() {
    return this._strToList(this.eventEmitStr)
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
