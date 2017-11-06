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
    this.data = ctx.data
    // this.model = ctx.model
    this.props = ctx.props
  }
}

module.exports = {
  BaseCollector
}
