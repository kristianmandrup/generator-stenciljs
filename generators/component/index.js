'use strict';
const {
  BaseComponentGenerator,
} = require('../common');

// extend String with sugarjs API
Sugar.String.extend()
module.exports = class extends BaseComponentGenerator {
  initializing() {
    this.welcomeMsg = `Welcome to ${chalk.red('stenciljs')} component generator`
  }

  end() {
    this.success('Component created :)')
  }
};
