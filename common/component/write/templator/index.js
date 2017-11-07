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

  validatePath(name, path, opts) {
    if (typeof path !== 'string') {
      this.handleError(`createTemplate: missing or bad ${name}`, {
        path,
        opts
      })
    }
    if (/undefined/.test(path)) {
      this.handleError(`createTemplate: bad ${name}, contains 'undefined' from missing variable`, {
        path,
        opts
      })
    }
    return this
  }

  createTemplate(opts = {}) {
    const {
      template,
      destination,
      data
    } = opts
    console.log('createTemplate', {
      template,
      destination,
      data,
      opts
    })

    this
      .validatePath('template', template, opts)
      .validatePath('destination', destination, opts)

    this.fs.copyTpl(
      this.templatePath(template),
      this.destinationPath(destination),
      data
    )
  }
}

module.exports = {
  Templator
}
