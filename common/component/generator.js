'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const path = require('path');
const ejsLint = require('ejs-lint')
const fs = require('fs-extra');
const beautify = require('json-beautify')
const Sugar = require('sugar');
Sugar.String.extend()

const {
  createLogger,
  BaseGenerator,
  buildPrompts,
  createRegistrator,
  createFileCreator,
  createDataModel,
  createArguments,
  createOptions
} = require('./imports')

class BaseComponentGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);
    createArguments(this)
    createOptions(this)
    this.configure()
  }

  configure() {
    this.registrator = createRegistrator(this)
  }

  lintEJS(template, options = {}) {
    let templatePath = path.join(__dirname, 'templates', template)
    let templateContent = fs.readFileSync(templatePath, 'utf-8')
    let result = ejsLint(templateContent, options)
  }

  get promptDefaults() {
    return {
      name: {
        default: 'my-component',
        message: 'Component name'
      }
    }
  }

  initializing() {
    this.welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component generator`
  }

  buildPrompts(prompts = []) {
    return buildPrompts(this.options, this.promptDefaults).concat(prompts)
  }

  get dataModel() {
    return createDataModel({
      props: this.props
    }, this.opts)
  }

  registerComponent(model) {
    registrator.register(model)
  }

  writing() {
    this.logger.info('writing files')
    const data = this.dataModel.data || {}
    const fileCreator = createFileCreator(this, data)
    fileCreator.createAllFiles()
    this.registerComponent(data.model)
  }

  createFileCreator(data) {
    createFileCreator(this, data, this.opts)
  }
}

module.exports = {
  BaseComponentGenerator
}
