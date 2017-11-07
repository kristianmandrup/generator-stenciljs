class MockTemplateData {
  constructor(ctx) {
    this.ctx = ctx
  }

  get component() {
    return {
      name: 'my-hello',
      className: 'MyHello',
      containerDir: 'components',
      fileName: 'my-hello',
      imports: ['Component', 'Prop'],
      declarations: `  @Prop
  name: string`,
      style: {
        fileName: 'my-hello',
        ext: 'scss'
      },
      tag: {
        open: '<div>',
        close: '<div/>',
        content: 'hello world'
      }
    }
  }

  get _interface() {
    return {
      htmlElementName: 'my-hello',
      fileName: 'my-hello',
      className: 'MyHello',
      props: `name?: string`
    }
  }

  get style() {
    return {
      fileName: 'my-hello',
      // containerDir: 'components',
      ext: 'scss',
      tag: {
        name: 'my-hello'
      }
    }
  }

  get definitions() {
    return {
      htmlElementName: 'my-hello',
      fileName: 'my-hello',
      // containerDir: 'components',
    }
  }

  get tests() {
    return {
      htmlElementName: 'my-hello',
      // containerDir: 'components',
      fileName: 'my-hello',
      ext: 'spec.ts',
      lib: 'jest',
      propertySpecs: ` // TODO: property specs`,
      className: 'MyHello',
      tag: {
        name: 'my-hello'
      },

    }
  }

  // This is the data format that the DataModel
  // should generate from the data collect and prepare
  get data() {
    return {
      model: {
        component: this.component,
        definitions: this.definitions,
        interface: this._interface,
        styles: this.style,
        tests: this.tests,
        dataService: {
          className: 'MyHello',
          // use: false,
          use: true
        }
      }
    }
  }
}

module.exports = {
  MockTemplateData
}
