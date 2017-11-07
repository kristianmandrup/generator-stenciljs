'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const path = require('path');
const ejsLint = require('ejs-lint')
const fs = require('fs-extra');
const Sugar = require('sugar');
Sugar.String.extend()

const {
  createLogger,
  BaseGenerator,
  buildPrompts,
  createRegistrator,
  createTemplateWriter,
  createDataModel,
  createArguments,
  createOptions,
  MockTemplateData
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
    // return buildPrompts(this.options, this.promptDefaults).concat(prompts)
    return []
  }

  // simulate user filled out props via prompts
  get _props() {
    return {
      name: 'my-hello',
      useShadowDOM: true,
      assetsDir: 'assets',
      propStr: 'name:string',
      apiMethodsStr: 'addItem',
      eventStr: 'activate',
      eventEmitStr: 'start',
      listenStr: 'open',
      lifeCycleEvents: [
        'WillLoad'
      ],
      wrapperFileTag: 'div',
      convention: 'name',
      testLib: 'jest',
      styleFileExt: 'scss',
      testFileExt: 'spec.ts',
      useDataService: true
    }
  }

  prompting() {
    this.props = this._props
  }

  get dataModel() {
    return createDataModel({
      props: this.props
    }, this.opts)
  }

  get autoRegister() {
    // return this.props.autoRegister
    return false
  }

  registerComponent(model) {
    if (this.autoRegister) {
      this.registrator.register(model)
    } else {
      this.log('Auto registration of component skipped')
    }
  }

  get mockData() {
    return new MockTemplateData().data
  }

  writing() {
    this.logger.info('writing files')
    const dataModel = this.dataModel
    console.log({
      dataModel
    })
    const data = dataModel ? dataModel.data : this.mockData
    // const model = data.model
    this.logJson('writing', data)

    // const templateWriter = this.createTemplateWriter(data)
    // templateWriter.writeAll()
    // this.registerComponent(data.model)
  }

  createTemplateWriter(data) {
    return createTemplateWriter(this, data, this.opts)
  }
}

module.exports = {
  BaseComponentGenerator
}
