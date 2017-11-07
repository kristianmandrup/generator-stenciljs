const {
  BaseCollector
} = require('./_base')

class Declarations extends BaseCollector {
  constructor(ctx, opts) {
    super(ctx, opts)
  }

  get values() {
    const vals = {
      allClassNames,
      declarationCode
    } = this
    return vals
  }

  get declarationCode() {
    return this._declarations = this._declarations || this.buildDeclarations()
  }

  get allClassNames() {
    return ['Component', ...this.declarationClasses].join(',')
  }

  get declarationClasses() {
    return this._classes = this._classes || Object.keys(this.decorators).map(name => name.capitalize())
  }

  buildDeclarations() {
    return this.data.declarationBlocks
      .map(block => {
        return Array.isArray(block) ? block.join('\n') : block;
      })
      .filter(txt => {
        return txt && !txt.isBlank()
      }).join('\n')
  }
}

module.exports = {
  Declarations
}