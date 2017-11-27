'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const extend = _.merge;
const path = require('path');
const pkgJson = require('../../package.json');
const parseAuthor = require('parse-author');
const githubUsername = require('github-username');
const askName = require('inquirer-npm-name');
const optionOrPrompt = require('yeoman-option-or-prompt');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('travis', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Include travis config (requires: generator-travis)'
    });

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include boilerplate files'
    });

    this.option('extend', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Extend boilerplate'
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

    this.option('projectRoot', {
      type: String,
      required: false,
      default: 'src',
      desc: 'Relative path to the project code root'
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert in the README.md file'
    });

    this.option('license', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Include a license (requires: generator-license)'
    });

    this.option('yarn', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use yarn or fallback to use npm'
    });
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

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
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

  _askForModuleName() {
    if (this.pkg.name || this.options.name || this.props.name) {
      this.props.name = this.props.name || this.pkg.name || _.kebabCase(this.options.name);
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
      .then(this._askFor.bind(this))
      .then(this._askForGithubAccount.bind(this));
  }

  writing() {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend(currentPkg, {
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [this.options.projectRoot],
      main: path.join(this.options.projectRoot, 'index.js').replace(/\\/g, '/'),
      keywords: [],
      devDependencies: {}
    });

    if (this.props.includeCoveralls) {
      pkg.devDependencies.coveralls = pkgJson.devDependencies.coveralls;
    }

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copyTpl(
      this.templatePath('bundles.json'),
      this.destinationPath(this.options.generateInto, 'bundles.json'), {}
    )
  }

  default () {
    // More fine tuning
    if (this.options.travis) {
      const options = {
        config: {}
      };
      if (this.props.includeCoveralls) {
        options.config.after_script = 'cat ./coverage/lcov.info | coveralls'; // eslint-disable-line camelcase
      }
      this.composeWith(require.resolve('generator-travis/generators/app'), options);
    }

    this.composeWith(require.resolve('../git'), {
      name: this.props.name,
      githubAccount: this.props.githubAccount,
      includeCoveralls: this.props.includeCoveralls
    });

    if (this.options.license && !this.pkg.license) {
      this.composeWith(require.resolve('generator-license/app'), {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      });
    }

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith(require.resolve('../readme'), {
        name: this.props.name,
        description: this.props.description,
        githubAccount: this.props.githubAccount,
        authorName: this.props.authorName,
        authorUrl: this.props.authorUrl,
        coveralls: this.props.includeCoveralls,
        content: this.options.readme
      });
    }
  }

  installing() {
    this.options.yarn ? this.yarnInstall() : this.npmInstall()
  }

  end() {
    this.log('Your package.json has been populated');

    // Travis and coveralls
    if (this.options.travis) {
      const travisUrl = chalk.cyan(
        `https://travis-ci.org/profile/${this.props.githubAccount || ''}`
      );
      this.log(`- Enable Travis integration at ${travisUrl}`);
    }

    if (this.props.includeCoveralls) {
      const coverallsUrl = chalk.cyan('https://coveralls.io/repos/new');
      this.log(`- Enable Coveralls integration at ${coverallsUrl}`);
    }
  }
};
