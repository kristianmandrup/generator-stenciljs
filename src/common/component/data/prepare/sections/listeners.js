const {
  BasePrepare
} = require('./_base')

function createListeners(ctx, opts) {
  return new Listeners(ctx, opts)
}

class Listeners extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.listenStr = this.valid('listenStr')
  }

  prepareData() {
    return this.listenStr ? this.values : {}
  }

  get names() {
    return this._strToList(this.listenStr)
  }

  get declarations() {
    return this.buildBlockList(this.names, prop => {
      let [name, type] = prop.split(':')
      let eventType = type || 'CustomEvent'
      let eventName = name.camelize(false)
      return `      @Listen('${eventName}')
  ${eventName}Handler(event: ${eventType}) {
    console.log('Received the custom ${eventName} event: ', event.detail);
  }`
    })
  }

  get decorators() {
    return this.hasNames ? {
      Listen: true
    } : {}
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
  Listeners,
  createListeners
}
