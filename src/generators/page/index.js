'use strict';
const {
  BaseGenerator
} = require('../../common');
const Sugar = require('sugar');

// extend String with sugarjs API
Sugar.String.extend()
module.exports = class PageGenerator extends BaseGenerator {
  constructor(args, options) {
    super(args, options);

    this.option('routeStr', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated Routes',
    });
  }

  initializing() {
    this._welcomeMsg = `Welcome to ${chalk.red('stenciljs')} page component generator`
  }

  get _prompts() {
    return [{
      name: 'routeStr',
      type: 'input',
      default: this.options.routes,
      message: 'Routes (name:component:path, ...)',
    }]
  }

  get _defaults() {
    return {
      name: {
        default: 'my-page',
        message: 'Page name'
      }
    }
  }

  _buildPrompts() {
    return super._buildPrompts(this._prompts, this._defaults)
  }

  // TODO: use superclass for necessary re-use of write logic...
  writing() {
    const name = this.props.name
    const pageFileName = name.dasherize()

    const {
      pageData
    } = require('./data')

    const {
      routeTags
    } = pageData(this.props)

    // let styleFile,
    // coreImports,
    // declarations,
    // openTag,
    // closeTag

    this._createPageComponentFile({
      tagName,
      className,
      routeTags,
      styleFile,
      coreImports,
      declarations,
      openTag,
      closeTag
    })
  }

  _createPageComponentFile(opts) {
    this.fs.copyTpl(
      this.templatePath('page.tsx.tpl'),
      this.destinationPath(`${componentDir}/pages/${pageFileName}.tsx`),
      opts
    )
  }


  end() {
    this.success('Page Component created :)')
  }
}
