const {
  BasePrepare
} = require('./_base')

function createEmitEventHandlers(ctx, opts) {
  return new EmitEventHandlers(ctx, opts)
}

class EmitEventHandlers extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.eventEmitStr = this.valid('eventEmitStr')
  }

  prepareData() {
    return this.eventEmitStr ? this.values : {}
  }

  get declarations() {
    return this.buildBlockList(this.names, eventName => {
      return `@Event() ${eventName.camelize()}: EventEmitter`
    })
  }

  get decorators() {
    return this.hasNames ? {
      Event: true
    } : {}
  }

  get names() {
    return this._strToList(this.eventEmitStr)
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
  EmitEventHandlers,
  createEmitEventHandlers
}
