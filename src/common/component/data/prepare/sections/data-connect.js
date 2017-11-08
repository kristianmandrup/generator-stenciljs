const {
  BasePrepare
} = require('./_base')

class DataConnect extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.useDataService = this.props.useDataService
  }

  prepareData() {
    return this.useDataService ? this.values : {}
  }

  get declarations() {
    const {
      tag,
      className
    } = this.component
    const connect = `{connect: '${tag.name}-data-service-injector'}`
    const injector = `injector: I${className}DataServiceInjector;`
    return ` @Prop(${connect}) ${injector}
  private dataService: ${className}DataService;

  componentWillLoad() {
      this.injector.create().then(dataService => {
          this.dataService = dataService;
          console.log(this.dataService.getData());
      });
  }\n`
  }

  get decorators() {
    return {
      Prop: true
    }
  }

  get values() {
    const {
      decorators,
      declarations
    } = this
    return {
      decorators,
      declarations
    }
  }
}

module.exports = {
  DataConnect
}
