function byConvention(convention, model) {
  return new NameConvention(convention, model).decideNames()
}

class NameConvention {
  constructor(convention, model) {
    this.convention = convention
    this.model = model
    this.tagName = model.tag.name
  }

  filePath(model) {
    return [model.fileName, model.ext].join('.')
  }

  decideNames() {
    let method = `_by${this.convention.capitalize()}`
    let model = this[method]()
    let {
      styleFileExt,
      testFileExt,
      testLib
    } = this.props
    model.style.ext = styleFileExt
    model.style.filePath = this.filePath(model.style)
    model.test.ext = testFileExt
    model.test.filePath = this.filePath(model.test)
    model.test.lib = testLib
    return model
  }

  _byName() {
    const name = this.tagName
    const nameMap = {
      component: {
        name,
        fileName: name
      },
      dts: {
        fileName: name,
      },
      interface: {
        fileName: name
      },
      style: {
        fileName: name
      },
      test: {
        fileName: name
      }
    }
    return nameMap
  }

  _byType() {
    const name = this.tagName
    const nameMap = {
      component: {
        name: name,
        fileName: 'component',
      },
      dts: {
        fileName: 'definitions',
      },
      interface: {
        fileName: 'interface'
      },
      style: {
        fileName: 'styles'
      },
      test: {
        fileName: 'unit'
      }
    }
    return nameMap
  }
}

module.exports = {
  NameConvention,
  byConvention
}
