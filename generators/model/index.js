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

const {
  BaseGenerator
} = require('../../common');

// extend String with sugarjs API
Sugar.String.extend()
module.exports = class ModelGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);

    this.argument('name', {
      type: String,
      required: false,
      default: 'my-model',
      desc: 'Name of your model'
    });

    this.option('props', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated props',
    });

    this.option('obsProps', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated observable props',
    });

    this.option('actions', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated action handlers',
    });
  }


  prompting() {
    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} model generator`);
    this.log(msg);

    const prompts = [{
      name: 'name',
      type: 'input',
      default: this.options.name || 'my-model',
      message: 'Name of your model'
    }, {
      name: 'propStr',
      type: 'input',
      default: this.options.props,
      message: 'Props (name:string,age:number ...)',
    }, {
      name: 'obsPropsStr',
      type: 'input',
      default: this.options.obsProps,
      message: 'Observable props (name:string,age:number ...)',
    }, {
      name: 'actionStr',
      type: 'input',
      default: this.options.actions,
      message: 'Action handlers (activate,execute, ...)',
    }]

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  writing() {
    const name = this.props.name
    const storeFileName = name.dasherize();
    const className = name.camelize();
    const componentDir = this.props.componentDir || 'components'

    const {
      propStr,
      obsPropsStr,
      actionStr
    } = this.props

    let propList = []
    let propMap = {}

    if (propStr) {
      propList = propStr.split(',').filter(name => !name.isBlank()).map(name => name.camelize(false))
      propMap = propList.reduce((acc, prop) => {
        let [name, type] = prop.split(':')
        acc[name] = type || 'any'
        return acc
      }, {})
    }
    let propNames = Object.keys(propMap)

    // TODO: avoid duplication
    let obsPropList = []
    let obsPropMap = {}

    if (obsPropsStr) {
      obsPropList = obsPropsStr.split(',').filter(name => !name.isBlank()).map(name => name.camelize(false))
      obsPropMap = obsPropList.reduce((acc, prop) => {
        let [name, type] = prop.split(':')
        acc[name] = type || 'any'
        return acc
      }, {})
    }
    let obsPropNames = Object.keys(obsPropMap)

    const declaredProps = propNames.map(name => {
      return `  ${name}: ${propMap[name]};`
    }).join('\n')

    const observableProps = obsPropNames.map(name => {
      return `      ${name}: ${obsPropMap[name]};`
    }).join('\n')

    const actionNames = actionStr.split(',').filter(name => !name.isBlank()).map(name => name.camelize(false))

    const actionsHandlers = actionNames.map(name => {
      let actionName = name.camelize(false)
      let entity = className.camelize(false)
      return `      ${actionName} : action(function ${actionName}(value:any) {
        console.log('${actionName} ' + value);
        // this.${entity} = value
      })`
    }).join('\n')

    const initProps = propNames.map(name => {
      return `    // this.${name} = ${name}`
    }).join('\n')

    this.fs.copyTpl(
      this.templatePath('store.ts.tpl'),
      this.destinationPath(`${componentDir}/stores/${storeFileName}.ts`), {
        className,
        declaredProps,
        observableProps,
        actionsHandlers,
        initProps
      }
    )
  }

  // TODO: use success utility method
  end() {
    this.log('Model (store) created :)')
  }
}
