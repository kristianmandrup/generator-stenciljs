'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;
const path = require('path');
const optionOrPrompt = require('yeoman-option-or-prompt');
const downloadRepo = require('download-repo')
const sao = require('sao')

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('projectSource', {
      type: String,
      required: false,
      // default: 'ionic-team/stencil-app-starter',
      desc: 'Boilerplate repo source'
    });

    this.option('targetPath', {
      type: String,
      required: false,
      // default: '.',
      desc: 'Target folder'
    });

    this.option('mechanic', {
      type: String,
      required: false,
      // default: 'repo',
      desc: 'Fetch/generate blueprint via: sao or repo (download)'
    });
  }

  _sayGoodbye() {
    this.log(`<:)`)
  }

  _optionOrPrompt(prompts) {
    const optPrompt = optionOrPrompt.bind(this)
    return optPrompt(prompts)
  }

  initializing() {
    this.name = this.options.name
  }

  prompting() {
    const prompts = [{
      name: 'projectSource',
      type: 'input',
      when: !this.options.projectSource,
      default: 'ionic-team/stencil-app-starter',
      message: 'Boilerplate repo',
      store: true
    }, {
      name: 'targetPath',
      when: !this.options.targetPath,
      default: this.name,
      message: 'Destination folder',
    }, {
      name: 'mechanic',
      type: 'radio',
      when: !this.options.mechanic,
      default: 'repo',
      choices: [
        'repo',
        'sao'
      ],
      message: 'Fetch/generate blueprint via',
      store: true
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _useSao() {
    const {
      projectSource,
      targetPath
    } = this

    let done = this.async()
    return sao({
      // The path to your template
      template: projectSource,
      targetPath
    }).catch(err => {
      console.error(err.name === 'SAOError' ? err.message : err.stack)
      process.exit(1)
    })
  }

  _useDownloadRepo() {
    const {
      projectSource,
      targetPath
    } = this

    let done = this.async()
    return downloadRepo(repoSource, {
        target: targetPath
      })
      .then(() => {
        this.log(`cd ${targetPath}`)
        done()
      }).catch(err => {
        this.log(err.message)
        process.exit(1)
      })
  }

  writing() {
    this.projectSource = this.props.projectSource
    this.targetPath = this.props.targetPath
    this.usingSao = this.props.mechanic === 'sao'
    return this.usingSao ? this._useSao() : this._useDownloadRepo()
  }

  end() {
    this.log('boilerplate ready :)')
  }
}
