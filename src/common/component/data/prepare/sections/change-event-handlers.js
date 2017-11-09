const {
  BasePrepare
} = require('./_base')

function createChangeEventHandlers(ctx, opts) {
  return new ChangeEventHandlers(ctx, opts)
}

class ChangeEventHandlers extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.decorators = {}
  }

  prepareData(changeList = []) {
    this.changeList = changeList
    return changeList ? this.values : {}
  }

  get declarations() {
    if (!this.changeList) return ''
    return this.buildBlockList(this.changeList, changeObj => {
      let {
        name,
        type,
        when
      } = changeObj
      const propClassName = name.camelize()
      when = when || 'did'
      const whenClass = when.camelize()
      let decoratorClass = `Prop${whenClass}Change`
      this.decorators[decoratorClass] = true
      return `  @${decoratorClass}('${name}')
${when}Change${propClassName}(newValue: ${type}) {
console.log('${propClassName} will change', newValue)
}`
    })
  }

  get values() {
    const {
      decorators,
      declarations
    } = this
    return {
      decorators,
      declarations
    }
  }
}

module.exports = {
  ChangeEventHandlers,
  createChangeEventHandlers
}
