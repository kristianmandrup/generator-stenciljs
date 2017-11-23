const {
  Collector
} = require('../../collector')

const Sugar = require('sugar')
Sugar.String.extend()

class BasePrepare extends Collector {
  constructor(ctx, opts) {
    super(ctx, opts)
    const {
      model
    } = ctx
    this.model = model
    // this.configure()
    // this.decorators = {}
  }

  // For some section, such as propTests we need to
  // first have prepared properties or at least the property names
  // DataConnect and some others needs the component data
  configure() {
    const {
      model
    } = this
    this.component = (model || {}).component
    this.properties = this.extract('properties')
    this.component = this.extract('component')
  }

  get hasNames() {
    return this.names && this.names.length > 0
  }

  extract(name) {
    const val = this.ctx[name] || this.ctx.model[name]
    if (val) {
      return val
    }
    this.handleError(`no value to extract for ${name}`, {
      ctx: this.ctx
    })
  }

  checkHas(name) {
    if (!this[name]) {
      this.handleError(`Missing ${name} on creation`, {
        ctx: this.ctx
      })
    }
  }

  valid(name, type = 'string') {
    const value = this.props[name]
    if (typeof value !== type) {
      this.handleError(`Invalid property ${name} in props. Must be a ${type}`, {
        props: this.props,
        name
      })
    }
    return value
  }

  _strToList(str) {
    return str.split(',').map(txt => txt.trim()).filter(txt => !txt.isBlank())
  }

  buildBlockList(list, buildFun) {
    if (!list) {
      this.handleError('buildBlockList', `no list to build from`, {
        list,
        buildFun
      })
    }
    return list.map(item => {
      return buildFun(item)
    }).join('\n')
  }

  buildBlockObj(list, buildFun) {
    return list.reduce((acc, item) => {
      acc = buildFun(acc, item)
      return acc
    }, {})
  }
}

module.exports = {
  BasePrepare
}
