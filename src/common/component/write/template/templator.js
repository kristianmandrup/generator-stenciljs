const {
  Loggable
} = require('../../../logger')

const {
  createTemplateValidator
} = require('./validator')

function createTemplator(ctx, templateOpts) {
  return new Templator(ctx, templateOpts)
}

class Templator extends Loggable {
  constructor(ctx, data, opts = {}) {
    super(opts)
    if (!(ctx && data)) {
      this.handleError('Templator', 'requires template context and data', {
        ctx,
        data
      })
    }

    this.ctx = ctx
    this.data = data
    this.fs = ctx.fs
    this.templatePath = ctx.templatePath.bind(ctx)
    this.destinationPath = ctx.destinationPath.bind(ctx)
    this.validator = this.createValidator()
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

  createValidator() {
    return createTemplateValidator({
      data: this.data
    }, this.opts)
  }

  validateData(name, data) {
    // TODO: reuse Template data validator
    return this.validator.validateData(data)
  }

  createTemplate(name, opts = {}) {
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
      .validateData(name, data)

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
