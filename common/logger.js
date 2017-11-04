export function createLogger(label) {
  return new Logger(label)
}

export class Logger {
  constructor(label) {
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
    this.log(`${formatLabel} ${msg}`)
  }
}
