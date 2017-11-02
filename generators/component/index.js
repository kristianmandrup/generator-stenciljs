'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

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
      default: null,
      desc: 'Comma separated Prop list',
    });

    this.option('wrapperTagName', {
      type: String,
      required: false,
      default: 'div',
      desc: 'Wrapper tag name',
    });

    this.option('convention', {
      type: 'list',
      required: false,
      default: 'type',
      choices: [
        'Name',
        'Type'
      ],
      desc: 'Naming convention to use',
      store: true
    });

    this.option('testLib', {
      type: String,
      required: false,
      default: 'scss',
      choices: [
        'jest'
      ],
      desc: 'Testing lib',
      store: true
    });

    this.option('styleFileExt', {
      type: String,
      required: false,
      default: 'scss',
      choices: [
        'scss',
        'styl',
        'css'
      ],
      desc: 'Style file extension',
      store: true
    });

    this.option('testFileExt', {
      type: String,
      required: false,
      default: 'scss',
      choices: [
        'spec.ts',
        'test.ts'
      ],
      desc: 'Test file extension',
      store: true
    });
  }

  _byConvention() {
    let method = `_by${_.capitalize(this.options.convention)}`
    return this[method]
  }

  _byName() {
    const name = this.tagName
    return {
      componentName: name,
      componentFileName: name,
      dtsFileName: name,
      interfaceFileName: name,
      styleFileName: name,
      testFileName: name
    }
  }

  _byType() {
    const name = this.tagName
    return {
      componentName: name,
      componentFileName: 'component',
      dtsFileName: 'definition',
      interfaceFileName: 'interface',
      styleFileName: 'styles',
      testFileName: 'unit'
    }
  }

  initializing() {}

  prompting() {
    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} component generator`);
    this.log(msg);

    const prompts = [{
      name: 'name',
      type: String,
      required: false,
      default: this.options.name || 'my-component',
      desc: 'Name of your component'
    }, {
      name: 'propStr',
      type: String,
      required: false,
      default: this.options.props,
      desc: 'Prop list , ',
    }, {
      name: 'wrapperFileTag',
      type: String,
      required: false,
      default: this.options.wrapperTag || 'div',
      desc: 'Wrapper tag name'
    }, {
      name: 'convention',
      type: 'list',
      required: false,
      default: this.options.convention || 'type',
      choices: [
        'Name',
        'Type'
      ],
      desc: 'File naming by',
      store: true
    }, {
      name: 'testLib',
      type: String,
      required: false,
      default: this.options.testLib || 'jest',
      choices: [
        'jest'
      ],
      desc: 'Testing lib',
      store: true
    }, {
      name: 'styleFileExt',
      type: String,
      required: false,
      default: this.options.styleExt || 'scss',
      choices: [
        'scss',
        'styl',
        'css'
      ],
      desc: 'Style file',
      store: true
    }, {
      name: 'testFileExt',
      type: String,
      required: false,
      default: this.options.testExt || 'scss',
      choices: [
        'spec.ts',
        'test.ts'
      ],
      desc: 'Test file',
      store: true
    }]

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }


  writing() {
    const name = this.props.name
    const tagName = _.dasherize(name);
    const className = _.camelize(name);

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
    } = this.byConvention();

    const {
      propStr,
      styleExt,
      wrapperTagName
    } = this.props

    const propList = propStr.split(',')
    const propMap = propList.reduce((acc, prop) => {
      let [key, val] = prop.split(':')
      acc[key] = val || 'string'
    }, {})

    const propNames = Object.keys(propMap)
    const htmlElementName = `HTML${className}Element`

    const componentDir = `components/${componentName}`

    this.fs.copyTpl(
      this.templatePath('templates/component.tsx.tpl'),
      this.destinationPath(`${componentDir}/${componentFileName}.tsx`), {
        tagName,
        className,
        styleFileName,
        propMap,
        propNames,
        wrapperTagName
      }
    );

    this.fs.copyTpl(
      this.templatePath('templates/definition.d.ts.tpl'),
      this.destinationPath(`${componentDir}/${dtsFileName}.d.ts`), {
        className,
        interfaceFileName
      }
    );

    this.fs.copyTpl(
      this.templatePath('templates/interface.d.ts.tpl'),
      this.destinationPath(`${componentDir}/${interfaceFileName}.d.ts`), {
        className,
        interfaceFileName,
        htmlElementName
      }
    );

    this.fs.copyTpl(
      this.templatePath(`templates/styles/styles.${styleFileExt}.tpl`),
      this.destinationPath(`${componentDir}/${styleFileName}.${styleFileExt}`), {
        tagName,
      }
    );

    this.fs.copyTpl(
      this.templatePath(`templates/test/${testLib}.spec.ts.tpl`),
      this.destinationPath(`${componentDir}/${testFileName}.${testFileExt}`), {
        tagName,
        className,
        propMap,
        propNames,
        componentFileName
      }
    );
  }
};
