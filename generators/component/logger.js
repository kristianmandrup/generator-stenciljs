const chalk = require('chalk');
const beautify = require('json-beautify')

function createLogger(ctxName, opts = {}) {
  return new Logger(ctxName, opts)
}

function createGenLogger(ctx, label) {
  return new GenLogger(ctx, label)
}

class Loggable {
  constructor(opts = {}) {
    this.logger = createLogger(this, opts)
    this.logging = true // opts.logging
  }

  logJson(label, json) {
    this.log(label, beautify(json, null, 2, 80))
  }

  log(label, ...msgs) {
    if (this.logging) {
      this.logger.log(label, ...msgs)
    }
  }

  error(label, ...msgs) {
    // if (this.logging)
    this.logger.error(label, ...msgs)
  }

  handleError(msg, data) {
    this.error(msg, data)
    throw new Error(msg)
  }
}

class Logger {
  constructor(ctxName, opts = {}) {
    this.ctxName = typeof ctxName === 'string' ? ctxName : ctxName.constructor.name
    this.logging = opts.logging
    this.io = opts.io || console
  }

  logJson(label, json) {
    this.io.log(label, beautify(json, null, 2, 80))
  }

  log(label, ...msgs) {
    this.io.log(this.ctxName, label, ...msgs)
  }

  error(...msgs) {
    this.log('error', ...msgs)
  }

  success(...msgs) {
    this.log('success', ...msgs)
  }

  warn(...msgs) {
    this.log('warning', ...msgs)
  }

  info(...msgs) {
    this.log('info', ...msgs)
  }
}

class GenLogger {
  constructor(ctx, label) {
    this.ctx = ctx
    this.label = label
  }

  error(msg) {
    this._log(msg, {
      label: 'register',
      modifier: 'bold'
    })
  }

  success(msg) {
    this._log(msg, {
      label: 'success',
      format: 'green',
      modifier: 'bold'
    })
  }

  warn(msg) {
    this._log(msg, {
      label: 'skipped',
      format: 'yellow',
      modifier: 'bold'
    })
  }

  info(msg) {
    this._log(msg, {
      label: 'register',
      modifier: 'bold'
    })
  }

  // use: success, warn, error and info methods
  _log(msg, opts = {}) {
    let {
      label = 'info',
        format = 'white',
        modifier
    } = opts
    label = label || this.label
    let write = chalk[format]
    write = modifier ? write[modifier] : write
    let formatLabel = write(label)
    this.ctx.log(`${formatLabel} ${msg}`)
  }
}

module.exports = {
  Loggable,
  createLogger,
  Logger,
  GenLogger,
  createGenLogger
}
