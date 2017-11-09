const {
  BasePrepare
} = require('./_base')

function createLifecycleEventHandlers(ctx, opts) {
  return new LifecycleEventHandlers(ctx, opts)
}

class LifecycleEventHandlers extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.lifeCycleEvents = this.props.lifeCycleEvents || []
  }

  get explainMap() {
    return {
      WillLoad: 'is about to be rendered',
      DidLoad: 'has been rendered',
      WillUpdate: 'will update',
      DidUpdate: 'did update',
      DidUnload: 'tag has been removed from the DOM'
    }
  }

  prepareData() {
    return this.lifeCycleEvents ? this.values : {}
  }

  get declarations() {
    return this.buildBlockList(this.lifeCycleEvents, name => {
      let lifecycleName = name.camelize()
      let explanation = this.explainMap[lifecycleName]
      return `  component${lifecycleName}() {
console.log('The component ${explanation}');
}`
    })
  }

  get values() {
    const {
      declarations
    } = this
    return {
      declarations
    }
  }
}

module.exports = {
  LifecycleEventHandlers,
  createLifecycleEventHandlers
}
