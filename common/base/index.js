const Generator = require('yeoman-generator');
const optionOrPrompt = require('yeoman-option-or-prompt');

class BaseGenerator extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  get _genName() {
    let className = this.constructor.name
    return className.replace('Generator', '')
  }

  get logger() {
    return this._logger = this._logger || createLogger(this._genName())
  }

  get pkg() {
    return this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  _optionOrPrompt(prompts) {
    const optPrompt = optionOrPrompt.bind(this)
    return optPrompt(prompts)
  }

  _buildPrompts() {
    return []
  }

  prompting() {
    // Have Yeoman greet the user.
    if (this._welcomeMsg) {
      const msg = yosay(this._welcomeMsg);
      this.log(msg);
    }
    const prompts = this._buildPrompts() || []

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }
}

module.exports = {
  BaseGenerator
}
