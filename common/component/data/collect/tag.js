const {
  BaseCollector
} = require('./_base')

class Tag extends BaseCollector {
  constructor(ctx, opts) {
    super(ctx, opts)
  }

  buildTag() {
    const containerTagName = this.props.wrapperTagName || 'div'
    return {
      name: this.props.name.dasherize(),
      open: `<${containerTagName}>`,
      close: `</${containerTagName}>`
    }
  }

  get values() {
    return this._tag = this._tag || this.buildTag()
  }
}
