'use strict';
const Generator = require('yeoman-generator');
const originUrl = require('git-remote-origin-url');
const fs = require('fs-extra')
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module name'
    });

    this.option('github-account', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });
  }

  initializing() {
    return originUrl(this.destinationPath(this.options.generateInto)).then(
      function (url) {
        this.originUrl = url;
      }.bind(this),
      function () {
        this.originUrl = '';
      }.bind(this)
    );
  }

  writing() {
    this.pkg = this.fs.readJSON(
      this.destinationPath(this.options.generateInto, 'package.json'), {}
    );

    let repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.githubAccount + '/' + this.options.name;
    }

    this.pkg.repository = this.pkg.repository || repository;

    this.props = this.props || {}
    this.props.includeCoveralls = this.options.includeCoveralls

    // add coverage to gitignore
    if (this.props.includeCoveralls) {
      const gitignore = fs.readFileSync('.gitignore', 'utf-8')
      if (typeof gitignore === 'string') {
        const lines = gitignore.split('\n').concat('coverage')
        fs.writeFileSync('.gitignore', lines.join('\n'))
      }
    }

    this.fs.writeJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      this.pkg
    );
  }

  end() {
    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath(this.options.generateInto)
    });

    if (!this.originUrl) {
      let repoSSH = this.pkg.repository;
      if (this.pkg.repository && this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath(this.options.generateInto)
      });
    }
  }
};
