const beautify = require('json-beautify')
const {
  Loggable
} = require('../../../logger')

function createRegistrator(generator, opts) {
  return new Registrator(generator, opts)
}

class Registrator extends Loggable {
  constructor(generator, opts) {
    super(opts)
    this.generator = generator
    this.destinationPath = generator.destinationPath.bind(generator)
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
