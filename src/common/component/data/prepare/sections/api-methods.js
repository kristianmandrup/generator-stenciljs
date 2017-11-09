const {
  BasePrepare
} = require('./_base')

function createApiMethods(ctx, opts) {
  return new ApiMethods(ctx, opts)
}

class ApiMethods extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.apiMethodsStr = this.valid('apiMethodsStr')
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
    const {
      names,
      decorators,
      declarations
    } = this
    return {
      names,
      decorators,
      declarations
    }
  }
}

module.exports = {
  ApiMethods,
  createApiMethods
}
