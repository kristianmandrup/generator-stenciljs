export function createFileCreator(ctx, templateOpts) {
  return new FileCreator(ctx, templateOpts)
}


export class FileCreator {
  constructor(ctx, templateOpts = {}) {
    this.ctx = ctx
    this.templateOpts = templateOpts
  }

  createAll() {
    this._createComponent()

    this._createTsDefinitions({
      className,
      interfaceFileName
    })
    this._createInterface({
      className,
      interfaceFileName,
      htmlElementName,
      interfaceProps,
      componentFileName
    })
    this._createStyles({
      tagName
    })
    this._createTests({
      tagName,
      className,
      propMap,
      propNames,
      propTests,
      componentFileName
    })
    this._createDataService({
      className
    })
  }


  _createComponent(opts = {}) {
    this.ctx.fs.copyTpl(
      this.ctx.templatePath('component.tsx.tpl'),
      this.ctx.destinationPath(`${this.ctx.componentDir}/${componentFileName}.tsx`),
      opts
    );
  }


  _createTsDefinitions(opts = {}) {
    this.ctx.fs.copyTpl(
      this.ctx.templatePath('definitions.d.ts.tpl'),
      this.ctx.destinationPath(`${this.ctx.componentDir}/${dtsFileName}.d.ts`),
      opts
    );
  }


  _createInterface(opts = {}) {
    const interfaceProps = propNames.map(name => {
      return `      ${name}?: any;`
    }).join('\n')

    this.ctx.fs.copyTpl(
      this.ctx.templatePath('interface.ts.tpl'),
      this.ctx.destinationPath(`${this.ctx.componentDir}/${interfaceFileName}.ts`),
      opts
    );
  }

  _createStyles(opts = {}) {
    this.ctx.fs.copyTpl(
      this.ctx.templatePath(`styles/styles.${styleFileExt}.tpl`),
      this.ctx.destinationPath(`${this.ctx.componentDir}/styles/${styleFileName}.${styleFileExt}`),
      opts
    );
  }

  _createTests(opts = {}) {
    const propTests = opts.propNames.map(name => {
      return `    it('should display the ${name}', async () => {
    element.${name} = '${name}';
    await flush(element);
    expect(element.textContent).toMatch(/${name}/);
  });`
    }).join('\n')

    this.ctx.fs.copyTpl(
      this.ctx.templatePath(`test/${testLib}.spec.ts.tpl`),
      this.ctx.destinationPath(`${this.ctx.componentDir}/test/${testFileName}.${testFileExt}`),
      opts
    )
  }


  _createDataService(opts = {}) {
    if (this.ctx.props.useDataService) {
      this.ctx.fs.copyTpl(
        this.ctx.templatePath(`data-service.ts.tpl`),
        this.ctx.destinationPath(`${this.ctx.componentDir}/data-service.ts`), {
          className
        })
    }
  }
}
