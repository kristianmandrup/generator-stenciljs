const {
  Loggable
} = require('../../../logger')

function createRenderFun(ctx, opts) {
  return new RenderFun(ctx, opts)
}

class RenderFun extends Loggable {
  constructor(ctx, opts) {
    super(ctx)
  }

  enrich() {
    this.component.tag.content = this.tagContent
  }

  get component() {
    return this.data.component
  }

  get renderProps() {
    return this.component.renderProps
  }

  get tagContent() {
    return [
      this.component.className,
      this.renderProps
    ].join('\n')
  }
}

module.exports = {
  RenderFun,
  createRenderFun,
}
