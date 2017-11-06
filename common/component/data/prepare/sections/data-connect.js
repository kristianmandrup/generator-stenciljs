const {
  BasePrepare
} = require('./_base')

class DataConnect extends BasePrepare {
  constructor(model = {}, opts = {}) {
    super(model, opts)
    this.useDataService = props.useDataService
  }

  prepareData() {
    this.useDataService ? this.values : {}
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
    const vals = {
      decorators,
      declarations
    } = this
    return vals
  }
}

module.exports = {
  DataConnect
}
