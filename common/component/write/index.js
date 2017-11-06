const {
  Loggable
} = require('../logger')

function createFileCreator(ctx, templateOpts) {
  return new FileCreator(ctx, templateOpts)
}

class FileCreator extends Loggable {
  constructor(ctx, templateData, opts = {}) {
    super(opts)
    if (!(ctx && templateData)) {
      this.handleError('FileCreator', 'must take a Generator (ctx) and template data (Object) arguments', {
        ctx,
        templateData
      })
    }

    this.ctx = ctx
    this.templateOpts = templateData
    this.fs = ctx.fs
    this.templatePath = ctx.templatePath.bind(ctx)
    this.destinationPath = ctx.destinationPath.bind(ctx)
  }

  createAllFiles() {
    this.createComponent()
    this.createTsDefinitions(templateOpts)
    this.createInterface(templateOpts)
    this.createStyles(templateOpts)
    this.createTests(templateOpts)
    this.createDataService(templateOpts)
  }


  createComponent(opts = {}) {
    // this.lintEJS('component.tsx.tpl')
    this.fs.copyTpl(
      this.templatePath('component.tsx.tpl'),
      this.destinationPath(`${this.componentDir}/${componentFileName}.tsx`),
      opts,
      ...opts.node.component
    );
  }


  createTsDefinitions(opts = {}) {
    this.fs.copyTpl(
      this.templatePath('definitions.d.ts.tpl'),
      this.destinationPath(`${this.componentDir}/${dtsFileName}.d.ts`),
      opts,
      ...opts.node.definition
    );
  }


  createInterface(opts = {}) {
    this.fs.copyTpl(
      this.templatePath('interface.ts.tpl'),
      this.destinationPath(`${this.componentDir}/${interfaceFileName}.ts`),
      opts,
      ...opts.node.interface
    );
  }

  createStyles(opts = {}) {
    this.fs.copyTpl(
      this.templatePath(`styles/styles.${styleFileExt}.tpl`),
      this.destinationPath(`${this.componentDir}/styles/${styleFileName}.${styleFileExt}`),
      opts,
      ...opts.node.style
    );
  }

  createTests(opts = {}) {
    this.fs.copyTpl(
      this.templatePath(`test/${testLib}.spec.ts.tpl`),
      this.destinationPath(`${this.componentDir}/test/${testFileName}.${testFileExt}`),
      opts,
      ...opts.node.tests
    )
  }


  createDataService(opts = {}) {
    if (this.props.useDataService) {
      this.fs.copyTpl(
        this.templatePath(`data-service.ts.tpl`),
        this.destinationPath(`${this.componentDir}/data-service.ts`),
        opts,
        ...opts.node.dataService
      )
    }
  }
}

module.exports = {
  createFileCreator,
  FileCreator
}
