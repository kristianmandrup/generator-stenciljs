const {
  Loggable
} = require('../../../logger')

const {
  createDeclarations
} = require('./declarations')

const {
  createImports
} = require('./imports')


function createEnricher(ctx, opts) {
  return new Enricher(ctx, opts)
}

class Enricher extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
    this.data = ctx.data
  }

  createImports() {
    return createImports(this.ctx, this.opts)
  }

  createDeclarations() {
    return createDeclarations(this.ctx, this.opts)
  }

  get imports() {
    return this.createImports()
  }

  get declarations() {
    return this.createDeclarations()
  }
}

module.exports = {
  Enricher,
  createEnricher
}
