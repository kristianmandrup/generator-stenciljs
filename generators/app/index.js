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

    this.option('travis', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include travis config'
    });

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include boilerplate files'
    });
    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('githubAccount', {
      type: String,
      required: false,
      desc: 'GitHub username or organization'
    });

    // this.option('projectRoot', {
    //   type: String,
    //   required: false,
    //   default: 'lib',
    //   desc: 'Relative path to the project code root'
    // });

    // this.option('readme', {
    //   type: String,
    //   required: false,
    //   desc: 'Content to insert in the README.md file'
    // });
  }

  _optionOrPrompt(prompts) {
    const optPrompt = optionOrPrompt.bind(this)
    return optPrompt(prompts)
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      const info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  }

  _askFor() {
    this.log('ask for')
    const prompts = [{
      name: 'description',
      message: 'Description',
      // when: !this.props.description
    }, {
      name: 'homepage',
      message: 'Project homepage url',
      // when: !this.props.homepage
    }, {
      name: 'authorName',
      message: `Author's Name `,
      // when: !this.props.authorName,
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: `Author's Email `,
      // when: !this.props.authorEmail,
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: `Author's Homepage `,
      // when: !this.props.authorUrl,
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      when: !this.pkg.keywords,
      filter(words) {
        return words.split(/\s*,\s*/g);
      }
    }, {
      name: 'includeCoveralls',
      type: 'confirm',
      message: 'Send coverage reports to coveralls',
      when: !this.options.coveralls
    }];

    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} app generator`);
    this.log(msg);

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

  _askForGithubAccount() {
    if (this.options.githubAccount) {
      this.props.githubAccount = this.options.githubAccount;
      return Promise.resolve();
    }

    return githubUsername(this.props.authorEmail)
      .then(username => username, () => '')
      .then(username => {
        return this.prompt({
          name: 'githubAccount',
          message: 'GitHub username or organization',
          default: username
        }).then(prompt => {
          this.props.githubAccount = prompt.githubAccount;
        });
      });
  }

  prompting() {
    return this._askForModuleName()
      .then(this._askFor.bind(this))
      .then(this._askForGithubAccount.bind(this));
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
