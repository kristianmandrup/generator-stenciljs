const {
  BasePrepare
} = require('./base-prepare')

class Props extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.propStr = ctx.props.propStr
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
    this.propStr ? this.values : {}
  }

  get list() {
    return this._strToList(this.propStr)
  }

  get obj() {
    return this.buildBlockObj(this.list, (acc, prop) => {
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
    return this.buildBlockList(this.names, name => {
      return `  @Prop() ${name}: ${properties.obj[name]};`
    })
  }

  // goes in the render method of component
  get renderProps() {
    this.buildBlockList(this.names, name => {
      return '        {this.' + name + '}'
    })
  }


  get decorators() {
    return {
      Prop: true
    }
  }

  get values() {
    const vals = {
      obj,
      list,
      changeList,
      names,
      renderProps,
      declarations
    } = this
    return vals
  }
}

module.exports = {
  Props
}
