class BasePrepare {
  constructor(model = {}) {
    this.model = model
    this.component = model.component
    this.properties = (model.node || {}).properties
    this.decorators = {}
  }

  _strToList(str) {
    return str.split(',').map(txt => tx.trim()).filter(txt => !txt.isBlank())
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
