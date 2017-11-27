'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const parseAuthor = require('parse-author');
const githubUsername = require('github-username');
const path = require('path');
const askName = require('inquirer-npm-name');
const optionOrPrompt = require('yeoman-option-or-prompt');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      desc: 'Generate boilerplate StencilJS project'
    })

    this.option('extend', {
      type: Boolean,
      required: false,
      desc: 'Extend boilerplate project'
    })
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  _optionOrPrompt(prompts) {
    const optPrompt = optionOrPrompt.bind(this)
    return optPrompt(prompts)
  }

  _askFor() {
    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} app generator`);
    this.log(msg);

    this.options = this.options || {}

    const extend = {
      name: 'extend',
      type: 'confirm',
      default: this.options.extend,
      message: 'Add extensions'
    }

    const prompts = [{
        name: 'boilerplate',
        type: 'confirm',
        default: this.options.boilerplate,
        message: 'Add boilerplate'
      },
      extend
    ]

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
      this.props = this.props || {}
      this.props.name = answer.name;
    });
  }

  // TODO: better sth like this
  // prompting() {
  //   return this._askForModuleName()
  //     .then(this._askFor.bind(this))
  //     .then(this._askForGithubAccount.bind(this));
  // }

  prompting(done) {
    return this._askFor().then(() => {
      return this._askForModuleName().then(done)
    })
  }

  end() {
    if (this.props.boilerplate) {
      this.composeWith(require.resolve('../boilerplate'), {
        name: this.props.name
      });
    }

    // extend boilerplate, such as updating package.json, Readme etc
    // if (this.props.extend) {
    //   this.composeWith(require.resolve('../extend'), {
    //     name: this.props.name
    //   });
    // }
  }
};
