const beautify = require('json-beautify')
const {
  FileWriter
} = require('../file-writer')

const firstBlockExpr = /^(\s|.)+?;/
class Registrator extends FileWriter {
  isAlreadyRegistered(tagName) {
    if (!this.stencilCfg.bundles) {
      this.handleError('Missing bundles entry in stencil.config.js', {
        config: this.stencilCfg
      })
    }

    const found = (this.stencilCfg.bundles.find(bundle => {
      if (!bundle.components) {
        return false
      }
      return bundle.components.find(component => {
        return component === tagName
      })
    }))
    return Boolean(found)
  }

  get stencilCfgFilePath() {
    return this.destinationPath('stencil.config.js')
  }

  loadContent(filePath) {
    return this.fs.readFileSync(filePath, 'utf8')
  }

  convertToJson(contents) {
    contents = contents.replace(/'(\w+)'/, `"$1"`)
    contents = contents.replace(/(\w+):/, `'$1'`)
    return JSON.parse(contents)
  }

  // rewrite exports.config to a separate json file
  get firstBlock() {
    const contents = this.stencilCfgFile
    contents.replace('exports.config =', '')
    return contents.match(firstBlockExpr)[1]
  }

  writeJson(filePath, json) {
    this.fs.writeJson(filePath, json)
  }

  reWriteConfig() {
    const firstBlock = this.firstBlock
    const jsonBlock = this.convertToJson(firstBlock)
    this.writeJson('bundles.json', jsonBlock)
  }

  useExternalJsonReference() {
    const blockExpr = /{(\s|.)+?};/
    const contents = this.stencilCfgFile
    return contents.replace(blockExpr, `require('./bundles.json')`)
  }

  get stencilCfgFile() {
    const filePath = this.stencilCfgFilePath
    try {
      return this.loadContent(filePath)
    } catch (err) {
      this.handleError(`Could not open stencil config file: ${filePath}`, {
        filePath,
        err
      })
    }
  }

  get stencilCfg() {
    return this.stencilCfgFile
  }

  registerInBundle(tagName) {
    const xBundles = this.stencilCfg.bundles.concat(this.bundleEntry(tagName))
    this.stencilCfg.bundles = xBundles

    const jsonStr = this.pretty(this.stencilCfg)
    const content = `exports.config = ${jsonStr}`
    try {
      this.fs.writeFileSync(this.stencilCfgFilePath, content, 'utf8')
      return {
        registered: true
      }
    } catch (err) {
      return {
        registered: false,
        error: err
      }
    }
  }

  bundleEntry(tagName) {
    return {
      components: [tagName]
    }
  }

  pretty(json) {
    return this.jsonStringify(json, null, 2, 80)
  }

  get jsonStringify() {
    return beautify // JSON.stringify
  }

  register(opts = {}) {
    const tagName = opts.tagName
    if (!tagName) {
      this.handleError('missing tagName', {
        opts
      })
    }

    this.logger.info(`${tagName} with Stencil`)

    if (this.isAlreadyRegistered(tagName)) {
      this.logger.warn(`${tagName} already registered in bundle.`)
      return
    }
    const result = this.registerInBundle(tagName)
    this.logger.success(`${tagName} registration complete`)
    return result
  }
}

function createRegistrator(generator, opts) {
  return new Registrator(generator, opts)
}

module.exports = {
  createRegistrator,
  Registrator
}
