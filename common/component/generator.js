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
    // return buildPrompts(this.options, this.promptDefaults).concat(prompts)
    return []
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

  get component() {
    return {
      name: 'my-hello',
      className: 'MyHello',
      containerDir: 'components',
      fileName: 'my-hello',
      imports: ['Component', 'Prop'],
      declarations: `  @Prop
name: string`,
      style: {
        fileName: 'my-hello',
        ext: 'scss'
      },
      tag: {
        open: '<div>',
        close: '<div/>',
        content: 'hello world'
      }
    }
  }

  get _interface() {
    return {
      htmlElementName: 'my-hello',
      fileName: 'my-hello',
      className: 'MyHello',
      props: `name?: string`
    }
  }

  get style() {
    return {
      fileName: 'my-hello',
      // containerDir: 'components',
      ext: 'scss',
      tag: {
        name: 'my-hello'
      }
    }
  }

  get definitions() {
    return {
      htmlElementName: 'my-hello',
      fileName: 'my-hello',
      // containerDir: 'components',
    }
  }

  get tests() {
    return {
      htmlElementName: 'my-hello',
      // containerDir: 'components',
      fileName: 'my-hello',
      ext: 'spec.ts',
      lib: 'jest',
      propertySpecs: ` // TODO: property specs`,
      className: 'MyHello',
      tag: {
        name: 'my-hello'
      },

    }
  }

  // This is the data format that the DataModel
  // should generate from the data collect and prepare
  get mockData() {
    return {
      model: {
        component: this.component,
        definitions: this.definitions,
        interface: this._interface,
        styles: this.style,
        tests: this.tests,
        dataService: {
          className: 'MyHello',
          // use: false,
          use: true
        }
      }
    }
  }

  writing() {
    this.logger.info('writing files')
    const data = this.dataModel.data || this.mockData
    console.log('writing', {
      data
    })

    const templateWriter = this.createTemplateWriter(data)
    templateWriter.writeAll()
    this.registerComponent(data.model)
  }

  createTemplateWriter(data) {
    return createTemplateWriter(this, data, this.opts)
  }
}

module.exports = {
  BaseComponentGenerator
}
