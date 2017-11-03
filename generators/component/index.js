'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const dasherize = require('sugar/string/dasherize');
const camelize = require('sugar/string/camelize');
const capitalize = require('sugar/string/capitalize');
const path = require('path');
const ejsLint = require('ejs-lint')
const fs = require('fs-extra');
module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: false,
      default: 'my-component',
      desc: 'Name of your component'
    });

    this.option('props', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated Prop list',
    });

    this.option('wrapperTagName', {
      type: String,
      required: false,
      default: 'div',
      desc: 'Wrapper tag name',
    });

    this.option('convention', {
      type: String,
      required: false,
      default: 'type',
      desc: 'Naming convention to use',
    });

    this.option('testLib', {
      type: String,
      required: false,
      default: 'jest',
      desc: 'Testing lib',
    });

    this.option('styleFileExt', {
      type: String,
      required: false,
      default: 'scss',
      desc: 'Style file extension',
    });

    this.option('testFileExt', {
      type: String,
      required: false,
      default: 'spec.ts',
      desc: 'Test file extension',
    });
  }

  _byConvention() {
    let method = `_by${capitalize(this.props.convention)}`
    // console.log({
    //   method
    // })
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
    // console.log({
    //   name,
    //   nameMap
    // })
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
    // console.log({
    //   name,
    //   nameMap
    // })
    return nameMap
  }

  initializing() {}

  prompting() {
    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} component generator`);
    this.log(msg);

    const prompts = [{
      name: 'name',
      type: 'input',
      default: this.options.name || 'my-component',
      message: 'Name of your component'
    }, {
      name: 'propStr',
      type: 'input',
      default: this.options.props,
      message: 'Prop list , ',
    }, {
      name: 'wrapperFileTag',
      type: 'input',
      default: this.options.wrapperTag || 'div',
      message: 'Wrapper tag name'
    }, {
      name: 'convention',
      type: 'list',
      default: 'type', // this.options.convention ||
      choices: [
        'name',
        'type'
      ],
      message: 'File naming by',
      store: true
    }, {
      name: 'testLib',
      type: 'radio',
      default: this.options.testLib || 'jest',
      choices: [
        'jest'
      ],
      message: 'Testing lib',
      store: true
    }, {
      name: 'styleFileExt',
      type: 'radio',
      default: this.options.styleExt || 'scss',
      choices: [
        'scss',
        'styl',
        'css'
      ],
      message: 'Style file',
      store: true
    }, {
      name: 'testFileExt',
      type: 'radio',
      default: this.options.testExt || 'spec.ts',
      choices: [
        'spec.ts',
        'test.ts'
      ],
      message: 'Test file',
      store: true
    }]

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _lintEJS(template, options = {}) {
    let templatePath = path.join(__dirname, 'templates', template)
    let templateContent = fs.readFileSync(templatePath, 'utf-8')
    let result = ejsLint(templateContent, options)
    // console.log(result)
  }


  writing() {
    const name = this.props.name
    const tagName = dasherize(name);
    const className = camelize(name);

    this.name = name
    this.tagName = tagName
    this.className = className

    const {
      componentName,
      componentFileName,
      dtsFileName,
      interfaceFileName,
      styleFileName,
      testFileName
    } = this._byConvention();

    let {
      propStr,
      styleFileExt,
      testFileExt,
      wrapperTagName,
      testLib
    } = this.props

    wrapperTagName = wrapperTagName || 'div'
    let openTag = `<${wrapperTagName}>`
    let closeTag = `</${wrapperTagName}>`

    let propList = []
    let propMap = {}

    if (propStr) {
      propList = propStr.split(',')
      propMap = propList.reduce((acc, prop) => {
        let [key, val] = prop.split(':')
        acc[key] = val || 'string'
        return acc
      }, {})
    }

    const propNames = Object.keys(propMap)
    const htmlElementName = `HTML${className}Element`

    const componentDir = `components/${componentName}`

    const declareProps = propNames.map(name => {
      return `@Prop() ${name}: ${propMap[name]}\n`
    })

    const displayProps = propNames.map(name => {
      return '{this.' + name + '}'
    })

    // this._lintEJS('component.tsx.tpl')
    let componentDest = this.destinationPath(`${componentDir}/${componentFileName}.tsx`)

    // console.log({
    //   propList,
    //   propMap,
    //   componentDest,
    //   componentDir,
    //   componentFileName,
    //   tagName,
    //   className,
    //   styleFileExt,
    //   styleFileName,
    //   declareProps,
    //   displayProps,
    //   wrapperTagName,
    //   openTag,
    //   closeTag
    // })

    this.fs.copyTpl(
      this.templatePath('component.tsx.tpl'),
      this.destinationPath(`${componentDir}/${componentFileName}.tsx`), {
        tagName,
        className,
        styleFileExt,
        styleFileName,
        declareProps,
        displayProps,
        wrapperTagName,
        openTag,
        closeTag
      }
    );

    this.fs.copyTpl(
      this.templatePath('definition.d.ts.tpl'),
      this.destinationPath(`${componentDir}/${dtsFileName}.d.ts`), {
        className,
        interfaceFileName
      }
    );

    const interfaceProps = propNames.map(name => {
      return `@Prop() ${name}?: any;`
    })

    // console.log({
    //   interfaceProps
    // })

    this.fs.copyTpl(
      this.templatePath('interface.ts.tpl'),
      this.destinationPath(`${componentDir}/${interfaceFileName}.ts`), {
        className,
        interfaceFileName,
        htmlElementName,
        interfaceProps,
        componentFileName
      }
    );

    this.fs.copyTpl(
      this.templatePath(`styles/styles.${styleFileExt}.tpl`),
      this.destinationPath(`${componentDir}/styles/${styleFileName}.${styleFileExt}`), {
        tagName,
      }
    );

    const propTests = propNames.map(name => {
      `it('should display the first ${name}', async () => {
        element.${name} = '${name}';
        await flush(element);
        expect(element.textContent).toMatch(/${name}/);
      });`
    })

    // console.log({
    //   propTests
    // })

    this.fs.copyTpl(
      this.templatePath(`test/${testLib}.spec.ts.tpl`),
      this.destinationPath(`${componentDir}/test/${testFileName}.${testFileExt}`), {
        tagName,
        className,
        propMap,
        propNames,
        propTests,
        componentFileName
      }
    );
  }
};
