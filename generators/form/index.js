'use strict';
const {
  BaseGenerator
} = require('../../common');
const Sugar = require('sugar');

// extend String with sugarjs API
Sugar.String.extend()
module.exports = class FormGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);

    this.option('fieldStr', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated fields',
    });
  }

  initializing() {
    this._welcomeMsg = `Welcome to ${chalk.red('stenciljs')} Form component generator`
  }

  get _prompts() {
    return [{
      name: 'fieldStr',
      type: 'input',
      default: this.options.Fields,
      message: 'Fields (name:component:path, ...)',
    }]
  }

  get _defaults() {
    return {
      name: {
        default: 'my-Form',
        message: 'Form name'
      }
    }
  }

  _buildPrompts() {
    return super._buildPrompts(this._prompts, this._defaults)
  }

  // TODO: use superclass for necessary re-use of write logic...
  writing() {
    const name = this.props.name
    const formFileName = name.dasherize()

    const {
      formData
    } = require('./data')

    const {
      fieldTags
    } = formData(this.props)

    // let styleFile,
    // coreImports,
    // declarations,
    // openTag,
    // closeTag

    this._createFormComponentFile({
      tagName,
      className,
      fieldTags,
      styleFile,
      coreImports,
      declarations,
      openTag,
      closeTag
    })
  }

  _createFormComponentFile(opts) {
    this.fs.copyTpl(
      this.templatePath('form.tsx.tpl'),
      this.destinationPath(`${componentDir}/forms/${formFileName}.tsx`),
      opts
    )
  }


  end() {
    this.success('Form Component created :)')
  }
}
