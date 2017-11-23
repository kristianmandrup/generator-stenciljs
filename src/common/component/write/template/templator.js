const {
  FileWriter
} = require('../file-writer')

const {
  createTemplateValidator
} = require('./validator')

class Templator extends FileWriter {
  constructor(ctx, data, opts = {}) {
    super(ctx, opts)
    if (!(ctx && data)) {
      this.handleError('Templator', 'requires template context and data', {
        ctx,
        data
      })
    }
    this.data = data
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
    return this.validator.validateData(data)
  }

  createTemplate(name, opts = {}) {
    const {
      template,
      destination,
      data
    } = opts

    try {
      this
        .validatePath('template', template, opts)
        .validatePath('destination', destination, opts)
        .validateData(name, data)

      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(destination),
        data
      )
      return {
        created: true
      }
    } catch (err) {
      return {
        created: false,
        error: err
      }
    }
  }
}

function createTemplator(ctx, data, opts) {
  return new Templator(ctx, data, opts)
}

module.exports = {
  Templator,
  createTemplator
}
