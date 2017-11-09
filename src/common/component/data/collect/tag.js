const {
  Loggable
} = require('../../../logger')

function createTag(ctx, opts) {
  return new Tag(ctx, opts)
}

class Tag extends Loggable {
  constructor(ctx, opts) {
    super(ctx, opts)
    this.props = ctx.props
    this.buildTag()
  }

  buildTag() {
    const containerTagName = this.props.wrapperTagName || 'div'
    return this._tag = {
      name: this.props.name.dasherize(),
      open: `<${containerTagName}>`,
      close: `</${containerTagName}>`
    }
  }

  get values() {
    return this._tag = this._tag || this.buildTag()
  }
}

module.exports = {
  createTag,
  Tag
}
