const {
  BasePrepare
} = require('./_base')

class ApiMethods extends BasePrepare {
  constructor({
    model,
    props
  }, opts = {}) {
    super(model, opts)
    this.apiMethodsStr = props
  }

  prepareData() {
    return this.apiMethodsStr ? {} : this.values
  }

  get declarations() {
    return this.buildBlockList(this.names, name => {
      const methodName = name.camelize(false)
      return `  @Event()
  ${methodName}(arg: any) {
    console.log('${methodName}', arg)
  }`
    })
  }

  get decorators() {
    return {
      Event: true
    }
  }

  get names() {
    return this._strToList(this.apiMethodsStr)
  }

  get values() {
    const vals = {
      names,
      decorators,
      declarations
    } = this
    return vals
  }
}
