const {
  BasePrepare
} = require('./_base')

function createDataConnect(ctx, opts) {
  return new DataConnect(ctx, opts)
}

class DataConnect extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.useDataService = this.props.useDataService
    this.component = ctx.component
  }

  prepareData(component) {
    if (component) {
      this.component = component
    }
    return this.useDataService ? this.values : {}
  }

  get declarations() {
    const {
      component
    } = this
    if (typeof component !== 'object') {
      this.handleError('DataConnect must have component info available', {
        ctx: this.ctx,
        component,
        model: this.model,
        collected: this.model.collected
      })
    }
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
  DataConnect,
  createDataConnect
}
