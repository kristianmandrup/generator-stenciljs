'use strict';
const Generator = require('yeoman-generator');
const downloadRepo = require('download-repo')
const _ = require('lodash');
const extend = _.merge;
const path = require('path');
const fs = require('fs-extra');
const optionOrPrompt = require('yeoman-option-or-prompt');
module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('repoSource', {
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
      name: 'repoSource',
      type: 'input',
      when: !this.options.source,
      default: 'ionic-team/stencil-app-starter',
      message: 'Boilerplate repo',
      store: true
    }, {
      name: 'targetPath',
      when: !this.options.targetPath,
      default: this.name,
      message: 'Destination folder',
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  writing() {
    let {
      repoSource,
      targetPath
    } = this.props
    let done = this.async()

    fs.pathExists(targetPath).then(exists => {
      if (exists) {
        console.log(`path: ${targetPath} already exists. Skipping download of boilerplate template`)
        done()
        return
      }

      downloadRepo(repoSource, {
          target: targetPath
        })
        .then(() => {
          console.log(`cd ${targetPath}`)
          done()
        })
    })

  }

  end() {
    this.log('boilerplate ready :)')
  }
}
