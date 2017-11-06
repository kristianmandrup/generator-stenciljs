const {
  BasePrepare
} = require('./_base')

class Listeners extends BasePrepare {
  constructor(model = {}, opts = {}) {
    super(model, opts)
    this.listenStr = props.listenStr
  }

  prepareData() {
    this.listenStr ? this.values : {}
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
    const vals = {
      names,
      decorators,
      handlers
    } = this
    return vals
  }
}

module.exports = {
  Listeners
}
