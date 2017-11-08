'use strict';
const {
  BaseComponentGenerator
} = require('../../common');
const chalk = require('chalk');
const Sugar = require('sugar');
// extend String with sugarjs API
Sugar.String.extend()

module.exports = class ElementGenerator extends BaseComponentGenerator {
  initializing() {
    this.welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component module generator`
  }

  prompting() {
    // this.log(this._buildPrompts())
    return super.prompting()
  }

  writing() {
    return super.writing()
  }

  end() {
    this.logger.success('Element created and ready for use :)')
  }
};
