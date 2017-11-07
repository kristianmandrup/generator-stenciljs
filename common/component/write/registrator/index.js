const beautify = require('json-beautify')
const {
  Loggable
} = require('../../../logger')

function createRegistrator(ctx, opts) {
  return new Registrator(ctx, opts)
}

class Registrator extends Loggable {
  constructor(ctx, opts) {
    super(opts)
    this.ctx = ctx
    this.destinationPath = ctx.destinationPath.bind(ctx)
  }

  isAlreadyRegistered(stencilCfg, tagName) {
    return (stencilCfg.bundles.find(bundle => {
      return bundle.components.find(component => {
        return component == tagName
      })
    }))
  }

  get stencilCfgFilePath() {
    return this.destinationPath('stencil.config.js')
  }

  get stencilCfgFile() {
    const filePath = this.stencilCfgFilePath
    try {
      return require(filePath)
    } catch (err) {
      this.handleError(`Could not open stencil config file: ${filePath}`, {
        filePath
      })
    }
  }

  get stencilCfg() {
    return this.stencilCfgFile.config
  }

  registerInBundle() {
    let xBundles = this.stencilCfg.bundles.concat(bundleEntry)
    stencilCfg.bundles = xBundles

    this.log(pretty(xBundles))

    let jsonStr = pretty(stencilCfg)
    let content = `exports.config = ${jsonStr}`
    this.fs.write(stencilCfgFilePath.stencilCfgFilePath, content)
  }

  register(opts = {}) {
    const jsonStringify = beautify // JSON.stringify
    const tagName = opts.tagName

    function pretty(json, opts) {
      return jsonStringify(json, null, 2, 80)
    }

    this.logger.info(`${tagName} with Stencil`)

    const bundleEntry = {
      components: [tagName]
    }
    if (this.isAlreadyRegistered(this.stencilCfg, tagName)) {
      this.logger.warn(`${tagName} already registered in bundle.`)
      return
    }
    this.registerInBundle()
    this.logger.success(`${tagName} registration complete`)
  }
}

module.exports = {
  createRegistrator,
  Registrator
}
