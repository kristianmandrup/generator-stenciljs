'use strict';
const _ = require('lodash');
const {
  BaseGenerator
} = require('../common');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const parseAuthor = require('parse-author');
const githubUsername = require('github-username');
const path = require('path');
const askName = require('inquirer-npm-name');

module.exports = class AppGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);

    this.option('type', {
      type: String,
      required: false,
      default: 'app',
      desc: 'Type of app'
    });
  }

  initializing() {
    this.pkg = this._pkgJson
  }

  _askFor() {
    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} app generator`);
    this.log(msg);

    const prompts = []

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _askForModuleName() {
    if (this.pkg.name || this.options.name) {
      this.props.name = this.pkg.name || _.kebabCase(this.options.name);
      return Promise.resolve();
    }

    return askName({
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate(str) {
        return str.length > 0;
      }
    }, this).then(answer => {
      this.props.name = answer.name;
    });
  }

  prompting() {
    return this._askForModuleName()
  }

  default () {
    if (this.options.boilerplate) {
      this.composeWith(require.resolve('../boilerplate'), {
        name: this.props.name
      });
    }

    // extend boilerplate, such as updating package.json, Readme etc
    if (this.options.extend) {
      this.composeWith(require.resolve('../extend'), {
        name: this.props.name
      });
    }
  }

  end() {
    this.log('Thanks for using StencilJS app generator.');
  }
};
