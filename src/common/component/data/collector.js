const {
  Loggable
} = require('../../logger')

class Collector extends Loggable {
  constructor(ctx, opts = {}) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
    this.validate()
  }

  validate() {
    if (!this.props) {
      this.handleError('missing props on ctx', {
        ctx: this.ctx
      })
    }
  }
}

module.exports = {
  Collector
}
