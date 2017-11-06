const {
  Loggable
} = require('../../../logger')

class BaseCollector extends Loggable {
  /**
   *
   * @param {*} ctx
   * @param {*} opts
   *
   * Ctx should contain:
   * - model
   * - data
   * - props (from user input)
   */
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.data = ctx.data
    // this.model = ctx.model
    this.props = ctx.props
    this.validate()
  }

  validate() {
    ['props', 'data'].map(name => {
      if (typeof this.props !== 'object') {
        this.validationErr(name)
      }
    })
  }

  validationErr(name) {
    this.handleError(`Validation Error: missing ${name}`, {
      ctx: this.ctx,
      [name]: this.ctx[name]
    })
  }
}

module.exports = {
  BaseCollector
}
