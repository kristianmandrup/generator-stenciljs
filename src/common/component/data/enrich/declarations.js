const {
  Loggable
} = require('../../../logger')

function createDeclarations(ctx, opts) {
  return new Declarations(ctx, opts)
}

class Declarations extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.data = ctx.data
  }

  get code() {
    return this._declarations = this._declarations || this.buildDeclarations()
  }

  get declarations() {
    return this.data.declarations
  }

  buildDeclarations() {
    return this.declarations
      .map(block => {
        return Array.isArray(block) ? block.join('\n') : block;
      })
      .filter(txt => {
        return txt && !txt.isBlank()
      }).join('\n')
  }
}

module.exports = {
  Declarations,
  createDeclarations
}
