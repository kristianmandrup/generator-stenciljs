const Generator = require('yeoman-generator');
const optionOrPrompt = require('yeoman-option-or-prompt');
const yosay = require('yosay');
const _ = require('lodash');
const extend = _.merge;
const {
  createGenLogger,
  createLogger
} = require('../logger')

class BaseGenerator extends Generator {
  constructor(args, options) {
    super(args, options);
    this.opts = options
  }

  logJson(label, json) {
    this.qlog.logJson(label, json)
  }

  get generatorName() {
    let className = this.constructor.name
    return className.replace('Generator', '')
  }

  get qlog() {
    return this._qlog = this._qlog || createLogger(this, this.opts)
  }


  get logger() {
    return this._logger = this._logger || createGenLogger(this, this.generatorName)
  }

  get pkg() {
    return this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  optionOrPrompt(prompts) {
    const optPrompt = optionOrPrompt.bind(this)
    return optPrompt(prompts)
  }

  buildPrompts() {
    return []
  }

  prompting() {
    // Have Yeoman greet the user.
    if (this.welcomeMsg) {
      const msg = yosay(this.welcomeMsg);
      this.log(msg);
    }
    const prompts = this.buildPrompts() || []

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }
}

module.exports = {
  BaseGenerator
}
