'use strict';
const {
  BaseBoilerplateGenerator
} = require('../../common');

module.exports = class BoilerplateGenerator extends BaseBoilerplateGenerator {
  prompting() {
    return super.prompting()
  }

  writing() {
    return super.writing()
  }

  end() {
    super.end()
  }
}
