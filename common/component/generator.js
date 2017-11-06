'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const path = require('path');
const ejsLint = require('ejs-lint')
const fs = require('fs-extra');
const beautify = require('json-beautify')
const {
  createLogger
} = require('../logger')
const Sugar = require('sugar');
Sugar.String.extend()

const {
  buildPrompts
} = require('./build-prompts')

const {
  createArguments,
  createOptions
} = require('./args-opts')

const {
  BaseGenerator
} = require('../base')

const {
  createTemplateData,
  TemplateData
} = require('./template-data')

const {
  createDataCollector
} = require('./data-collector')

const {
  createFileCreator
} = require('./file-creator')

class BaseComponentGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);
    createArguments(this)
    createOptions(this)
  }

  _lintEJS(template, options = {}) {
    let templatePath = path.join(__dirname, 'templates', template)
    let templateContent = fs.readFileSync(templatePath, 'utf-8')
    let result = ejsLint(templateContent, options)
  }

  get _defaults() {
    return {
      name: {
        default: 'my-component',
        message: 'Component name'
      }
    }
  }

  initializing() {
    this._welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component generator`
  }

  _buildPrompts(prompts = []) {
    return buildPrompts(this.options, this._defaults).concat(prompts)
  }

  get dataCollector() {
    return createDataCollector(this.props)
  }

  get collectData() {
    return this.dataCollector.collectAll()
  }

  writing() {
    this.logger.info('writing files')
    // model,
    //  - model.className
    //  ...
    //  - model.node.interface.fileName
    // tag,
    // declarations,
    // displayBlocks,
    // imports
    const data = this.collectData
    const fileCreator = createFileCreator(this, data)

    fileCreator.createAllFiles()

    this._registerComponent(data.model)
  }

  createFileCreator(templateOpts) {
    createFileCreator(this, templateOpts)
  }

  isAlreadyRegistered(stencilCfg, tagName) {
    return (stencilCfg.bundles.find(bundle => {
      return bundle.components.find(component => {
        // console.log('compare', {
        //   component,
        //   tagName
        // })
        return component == tagName
      })
    }))
  }

  get stencilCfgFilePath() {
    return this.destinationPath('stencil.config.js')
  }

  get stencilCfg() {
    return require(this.stencilCfgFilePath).config
  }

  registerInBundle() {
    let xBundles = stencilCfg.bundles.concat(bundleEntry)
    stencilCfg.bundles = xBundles

    this.log(pretty(xBundles))

    let jsonStr = pretty(stencilCfg)
    let content = `exports.config = ${jsonStr}`
    this.fs.write(stencilCfgFilePath.stencilCfgFilePath, content)
  }

  _registerComponent(opts = {}) {
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
  BaseComponentGenerator
}
