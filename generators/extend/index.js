'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
// const chalk = require('chalk');
const extend = _.merge;
const path = require('path');
const pkgJson = require('../../package.json');

module.exports = class extends Generator {
  writing() {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
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
    }, currentPkg);

    if (this.props.includeCoveralls) {
      pkg.devDependencies.coveralls = pkgJson.devDependencies.coveralls;
    }

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
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

    // if (this.options.editorconfig) {
    //   this.composeWith(require.resolve('../editorconfig'));
    // }

    // this.composeWith(require.resolve('../eslint'));

    // this.composeWith(require.resolve('../git'), {
    //   name: this.props.name,
    //   githubAccount: this.props.githubAccount
    // });

    // if (this.options.license && !this.pkg.license) {
    //   this.composeWith(require.resolve('generator-license/app'), {
    //     name: this.props.authorName,
    //     email: this.props.authorEmail,
    //     website: this.props.authorUrl
    //   });
    // }

    // if (!this.fs.exists(this.destinationPath('README.md'))) {
    //   this.composeWith(require.resolve('../readme'), {
    //     name: this.props.name,
    //     description: this.props.description,
    //     githubAccount: this.props.githubAccount,
    //     authorName: this.props.authorName,
    //     authorUrl: this.props.authorUrl,
    //     coveralls: this.props.includeCoveralls,
    //     content: this.options.readme
    //   });
    // }
  }

  installing() {
    this.yarnInstall();
  }

  end() {
    this.log('Thanks for using Yeoman.');

    // Travis and coveralls
    // if (this.options.travis) {
    //   const travisUrl = chalk.cyan(
    //     `https://travis-ci.org/profile/${this.props.githubAccount || ''}`
    //   );
    //   this.log(`- Enable Travis integration at ${travisUrl}`);
    // }

    // if (this.props.includeCoveralls) {
    //   const coverallsUrl = chalk.cyan('https://coveralls.io/repos/new');
    //   this.log(`- Enable Coveralls integration at ${coverallsUrl}`);
    // }
  }
};
