'use strict';
const {
  BaseGenerator
} = require('../../common');

module.exports = class ComponentGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);
  }

  // either compose with boilerplate or element
  get _prompts() {
    return [{
      name: 'componentModule',
      type: 'confirm',
      default: false,
      message: 'Create separate component app',
    }]
  }

  _buildPrompts() {
    return this._prompts
  }

  prompting() {
    return super.prompting()
  }

  default () {
    if (this.props.componentModule) {
      this.composeWith(require.resolve('../boilerplate'), {
        type: 'component'
      });
      return
    }
    this.composeWith(require.resolve('../element'), {});
  }

  end() {
    this.success('Component created :)')
  }
}
