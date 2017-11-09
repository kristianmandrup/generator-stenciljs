const {
  BasePrepare
} = require('./_base')

function createEventHandlers(ctx, opts) {
  return new EventHandlers(ctx, opts)
}

class EventHandlers extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.eventStr = this.valid('eventStr')
  }

  prepareData() {
    return this.eventStr ? {} : this.values
  }

  get names() {
    return this._strToList(this.eventStr)
  }

  get declarations() {
    return this.buildBlockList(this.names, eventName => {
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
      declarations
    } = this
    return {
      names,
      declarations
    }
  }
}

module.exports = {
  EventHandlers,
  createEventHandlers
}
