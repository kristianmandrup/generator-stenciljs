'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('source', {
      type: String,
      required: false,
      default: 'ionic-team/stencil-app-starter',
      desc: 'Boilerplate project location (SAO)'
    });

    this.option('destination', {
      type: String,
      required: false,
      default: null,
      desc: 'Destination folder'
    });
  }

  writing() {
    const {
      source,
      destination
    } = this.options;
    let args = [source];
    if (destination) {
      args = args.concat(destination);
    }
    this.spawnCommand('sao', args).on('close', () => {
      this._sayGoodbay();
      this.async();
    });
  }
};
