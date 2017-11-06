const {
  Loggable
} = require('../../../logger')

function createTemplator(ctx, templateOpts) {
  return new Templator(ctx, templateOpts)
}

class Templator extends Loggable {
  constructor(ctx, templateData, opts = {}) {
    super(opts)
    if (!(ctx && templateData)) {
      this.handleError('Templator', 'requires template context and data', {
        ctx,
        templateData
      })
    }

    this.ctx = ctx
    this.templateOpts = templateData
    this.fs = ctx.fs
    this.templatePath = ctx.templatePath.bind(ctx)
    this.destinationPath = ctx.destinationPath.bind(ctx)
  }

  createTemplate(opts = {}) {
    const {
      templatePath,
      destPath,
      data
    } = opts
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destPath),
      data
    )
  }
}

module.exports = {
  Templator
}
