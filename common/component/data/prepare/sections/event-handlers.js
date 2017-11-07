const {
  BasePrepare
} = require('./_base')

class EventHandlers extends BasePrepare {
  constructor({
    model,
    props
  }, opts = {}) {
    super(model, opts)
    this.eventStr = props
  }

  prepareData() {
    return this.eventStr ? {} : this.values
  }

  get names() {
    return this._strToList(eventStr)
  }

  get handlers() {
    return this.buildBlockList(events.names, eventName => {
      eventName = eventName.camelize();
      return `  handle${eventName}(event: UIEvent) {
  console.log('Received the ${eventName}', {
    event
  });
}`
    })
  }

  get values() {
    const {
      names,
      handlers
    } = this
    return {
      names,
      handlers
    }
  }
}

module.exports = {
  EventHandlers
}
