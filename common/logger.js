const chalk = require('chalk');

function createLogger(ctxName, opts) {
  return new Logger(ctxName, opts)
}

function createGenLogger(ctx, label) {
  return new GenLogger(ctx, label)
}

class Loggable {
  constructor(opts = {}) {
    this.logger = createLogger(this, opts)
  }

  log(label, ...msgs) {
    if (this.logging) {
      this.logger.log(label, ...msgs)
    }
  }

  error(label, ...msgs) {
    if (this.logging) {
      this.logger.error(label, ...msgs)
    }
  }

  handleError(label, msg, data) {
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

  log(label, ...msgs) {
    this.io.log(ctxName, label, ...msgs)
  }

  error(...msgs) {
    this._log('error', ...msgs)
  }

  success(msg) {
    this._log('success', ...msgs)
  }

  warn(msg) {
    this._log('warning', ...msgs)
  }

  info(msg) {
    this._log('info', ...msgs)
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
