const {
  BasePrepare
} = require('./_base')

class LifecycleEventHandlers extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.lifeCycleEvents = ctx.props.lifeCycleEvents
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
    this.lifeCycleEvents ? this.values : {}
  }

  get handlers() {
    return this.buildBlockList(lifeCycleEvents, name => {
      let lifecycleName = name.camelize()
      let explanation = this.explainMap[lifecycleName]
      return `  component${lifecycleName}() {
console.log('The component ${explanation}');
}`
    })
  }

  get values() {
    const {
      handlers
    } = this
    return {
      handlers
    }
  }
}

module.exports = {
  LifecycleEventHandlers
}
