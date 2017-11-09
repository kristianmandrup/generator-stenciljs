const {
  Loggable
} = require('../../../../logger')

const Sugar = require('sugar');
Sugar.String.extend()

class BasePrepare extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    const {
      model,
      props
    } = ctx
    this.ctx = ctx
    this.model = model
    this.props = props
    this.configure()
    // this.decorators = {}
  }

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
    return this.ctx[name] || this.ctx.model.collected[name]
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
      return acc = buildFun(acc, item)
    }, {})
  }

}

module.exports = {
  BasePrepare
}
