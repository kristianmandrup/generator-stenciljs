'use strict';
const {
  BaseComponentGenerator,
} = require('../common');

// extend String with sugarjs API
Sugar.String.extend()
module.exports = class ElementGenerator extends BaseComponentGenerator {
  initializing() {
    this.welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component module generator`
  }

  end() {
    this.success('Component module created, ready for use :)')
  }
};
