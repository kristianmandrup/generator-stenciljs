const {
  BasePrepare
} = require('./_base')

function createProperties(ctx, opts) {
  return new Properties(ctx, opts)
}

class Properties extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.propStr = this.valid('propStr')
    this.changeList = []
  }
  /**
   * - list
   * - obj
   * - names
   * - declarations
   * - changeList
   * - renderProps
   * - decorators
   */
  prepareData() {
    return this.propStr ? this.values : {}
  }

  get list() {
    return this._strToList(this.propStr)
  }

  get obj() {
    return this._obj = this._obj || this.buildBlockObj(this.list, (acc, prop) => {
      let [name, type, when] = prop.split(':')
      if (when) {
        this.changeList.push({
          name,
          type,
          when
        })
      }
      acc[name] = type || 'string'
      return acc
    })
  }

  get names() {
    return Object.keys(this.obj)
  }

  // Prop declarations
  get declarations() {
    const properties = this.ctx.properties
    return this.buildBlockList(this.names, name => {
      return `  @Prop() ${name}: ${this.obj[name]};`
    })
  }

  // goes in the render method of component
  get renderProps() {
    return this.buildBlockList(this.names, name => {
      return '        {this.' + name + '}'
    })
  }


  get decorators() {
    return this.hasNames ? {
      Prop: true
    } : {}
  }

  get values() {
    const {
      obj,
      list,
      changeList,
      names,
      renderProps,
      declarations,
      decorators,
    } = this
    return {
      obj,
      list,
      changeList,
      names,
      renderProps,
      declarations,
      decorators,
    }
  }
}

module.exports = {
  Properties,
  createProperties
}