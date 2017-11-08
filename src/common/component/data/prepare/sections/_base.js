const Sugar = require('sugar');
Sugar.String.extend()

class BasePrepare {
  constructor(ctx) {
    const {
      model,
      props
    } = ctx
    this.ctx = ctx
    this.model = model
    this.props = props
    this.component = model.component
    this.properties = (model.node || {}).properties
    // this.decorators = {}
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
