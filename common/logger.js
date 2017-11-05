const chalk = require('chalk');

function createLogger(ctx, label) {
  return new Logger(ctx, label)
}

class Logger {
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
  createLogger,
  Logger
}
