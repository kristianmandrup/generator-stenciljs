const {
  Loggable
} = require('../../logger')

class FileWriter extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.configDelegates()
  }

  get delegates() {
    return ['fs', 'copyTpl', 'destinationPath', 'templatePath']
  }

  configDelegates() {
    const generator = this.ctx
    this.delegates.map(name => {
      const delegate = generator[name]
      this[name] = delegate
      if (typeof delegate === 'function') {
        this[name] = this[name].bind(generator)
      }
      return this
    })
  }
}

module.exports = {
  FileWriter
}
