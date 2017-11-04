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

export class BaseComponentGenerator extends Generator {
  constructor(args, options) {
    super(args, options);
    createArguments(this)
    createOptions(this)

    this.logger = createLogger('component')
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

  _buildPrompts(prompts = []) {
    return buildPrompts(this.options).concat(prompts)
  }

  initializing() {
    this._welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component generator`
  }

  prompting() {
    // Have Yeoman greet the user.
    const msg = yosay(this._welcomeMsg);
    this.log(msg);

    const prompts = this._buildPrompts()

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _createTemplateData() {
    return createTemplateData(this.props)
  }

  _createComponentModule() {

  }

  writing() {
    if (this.props.componentModule) {
      this._createComponentModule()
    }

    const data = this._createTemplateData().buildAll()

    const propMap = data.properties.obj
    const propNames = data.properties.names

    const name = this.props.name
    const tagName = name.dasherize();
    const className = name.camelize();

    this.name = name
    this.tagName = tagName
    this.className = className

    let dataServiceImports
    if (this.props.useDataService) {
      dataServiceImports = `import { ${className}DataService, I${className}DataServiceInjector } from './data-service'\n`
    }

    const {
      componentName,
      componentFileName,
      dtsFileName,
      interfaceFileName,
      styleFileName,
      testFileName
    } = this._byConvention();

    let {
      styleFileExt,
      testFileExt,
      wrapperTagName,
      testLib
    } = this.props

    wrapperTagName = wrapperTagName || 'div'
    let openTag = `<${wrapperTagName}>`
    let closeTag = `</${wrapperTagName}>`

    const htmlElementName = `HTML${className}Element`

    this.componentDir = `components/${componentName}`

    let coreImports = ['Component', 'Prop'].join(',')

    // this._lintEJS('component.tsx.tpl')
    let componentDest = this.destinationPath(`${this.componentDir}/${componentFileName}.tsx`)

    let declarations = data.blocks
      .map(block => {
        return Array.isArray(block) ? block.join('\n') : block;
      })
      .filter(txt => {
        console.log('filter', txt)
        return txt && !txt.isBlank()
      }).join('\n')

    // inside render
    let displayBlocks = [className, displayProps].filter(txt => !txt.isBlank()).join('\n')

    const fileCreator = createFileCreator({
      tagName,
      className,
      styleFileExt,
      styleFileName,
      wrapperTagName,
      openTag,
      closeTag,
      declarations,
      displayBlocks,
      dataServiceImports,
      coreImports
    })

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
