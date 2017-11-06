const {
  BasePrepare
} = require('./_base')

class ChangeEventHandlers extends BasePrepare {
  constructor(model = {}, opts = {}) {
    super(model, opts)
  }

  prepareData({
    changeList
  }) {
    changeList ? build(changeList).values : {}
  }

  build(changeList) {
    this.declarations = this.buildBlockList(changeList, changeObj => {
      let {
        name,
        type,
        when
      } = changeObj
      const propClassName = name.camelize()
      when = when || 'did'
      const whenClass = when.camelize()
      const decoratorClass = `Prop${whenClass}Change`
      return `  @${decoratorClass}('${name}')
${when}Change${propClassName}(newValue: ${type}) {
console.log('${propClassName} will change', newValue)
}`
    })
    this.decorators[decoratorClass] = true
    return this
  }

  get values() {
    const vals = {
      decorators,
      declarations
    } = this
    return vals
  }
}
