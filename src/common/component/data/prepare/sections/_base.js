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
    this.component = model.component
    this.properties = (model.node || {}).properties
    this.decorators = {}
  }

  valid(name, type = 'string') {
    const value = this.props[name]
    if (typeof value !== type) {
      this.handleError('Invalid property ${name} in props. Must be a ${type}', {
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
