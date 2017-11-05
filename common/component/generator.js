'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const Sugar = require('sugar');
const path = require('path');
const ejsLint = require('ejs-lint')
const fs = require('fs-extra');
const beautify = require('json-beautify')
const {
  createLogger
} = require('../logger')
Sugar.String.extend()

const {
  createArguments,
  createOptions
} = require('./opts-args')

const {
  createTemplateData,
  TemplateData
} = require('./template-data')

const {
  createFileCreator
} = require('./file-creator')

export class BaseComponentGenerator extends BaseGenerator {
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

  _byConvention() {
    let method = `_by${this.props.convention.capitalize()}`
    return this[method]()
  }

  _byName() {
    const name = this.tagName
    const nameMap = {
      componentName: name,
      componentFileName: name,
      dtsFileName: name,
      interfaceFileName: name,
      styleFileName: name,
      testFileName: name
    }
    return nameMap
  }

  _byType() {
    const name = this.tagName
    const nameMap = {
      componentName: name,
      componentFileName: 'component',
      dtsFileName: 'definition',
      interfaceFileName: 'interface',
      styleFileName: 'styles',
      testFileName: 'unit'
    }
    return nameMap
  }

  initializing() {
    this._welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component generator`
  }

  _buildPrompts(prompts = []) {
    return buildPrompts(this.options).concat(prompts)
  }

  get _dataCollector() {
    return new CollectData(this.props)
  }

  get _collectData() {
    return this._dataCollector().collectAll()
  }

  writing() {
    const data = this._collectData
    const fileCreator = createFileCreator(data)

    fileCreator.createAllFiles()

    this._registerInComponentBundle({
      tagName
    })
  }

  createFileCreator(templateOpts) {
    createFileCreator(this, templateOpts)
  }

  _registerInComponentBundle(opts = {}) {
    const jsonStringify = beautify // JSON.stringify
    const tagName = opts.tagName

    function pretty(json, opts) {
      return jsonStringify(json, null, 2, 80)
    }

    this.logger.info(`${tagName} with Stencil`)

    const bundleEntry = {
      components: [tagName]
    }
    let stencilCfgFilePath = this.destinationPath('stencil.config.js')

    let stencilCfg = require(stencilCfgFilePath).config

    if (stencilCfg.bundles.find(bundle => {
        return bundle.components.find(component => {
          // console.log('compare', {
          //   component,
          //   tagName
          // })
          return component == tagName
        })
      })) {
      this.logger.warn(`${tagName} already registered in bundle.`)
      return
    }

    let xBundles = stencilCfg.bundles.concat(bundleEntry)
    stencilCfg.bundles = xBundles

    this.log(pretty(xBundles))

    let jsonStr = pretty(stencilCfg)
    let content = `exports.config = ${jsonStr}`
    this.fs.write(stencilCfgFilePath, content)

    this.logger.success(`${tagName} registration complete`)
  }
}
