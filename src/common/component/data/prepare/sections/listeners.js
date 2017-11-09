const {
  BasePrepare
} = require('./_base')

class Listeners extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.listenStr = this.valid('listenStr')
  }

  prepareData() {
    return this.listenStr ? this.values : {}
  }

  get names() {
    return this._strToList(listenStr)
  }

  get handlers() {
    return this.buildBlockObj(listeners.names, (acc, prop) => {
      let [name, type] = prop.split(':')
      let eventType = type || 'CustomEvent'
      let eventName = name.camelize(false)
      acc[key] = `      @Listen('${eventName}')
  ${eventName}Handler(event: ${eventType}) {
    console.log('Received the custom ${eventName} event: ', event.detail);
  }`
      return acc
    }).join('\n')
  }

  get decorators() {
    return {
      Listen: true
    }
  }

  get values() {
    const {
      names,
      decorators,
      handlers
    } = this
    return {
      names,
      decorators,
      handlers
    }
  }
}

module.exports = {
  Listeners
}
