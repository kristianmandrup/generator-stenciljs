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

  prepareData(
    changeList
  ) {
    return changeList ? this.build(changeList).values : {}
  }

  build(changeList) {
    let decoratorClass
    this.declarations = this.buildBlockList(changeList, changeObj => {
      let {
        name,
        type,
        when
      } = changeObj
      const propClassName = name.camelize()
      when = when || 'did'
      const whenClass = when.camelize()
      decoratorClass = `Prop${whenClass}Change`
      return `  @${decoratorClass}('${name}')
${when}Change${propClassName}(newValue: ${type}) {
console.log('${propClassName} will change', newValue)
}`
    })
    this.decorators[decoratorClass] = true
    return this
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
