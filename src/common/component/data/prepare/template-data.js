const Sugar = require('sugar');
Sugar.String.extend()

const {
  Loggable
} = require('../../../logger')

const {
  ApiMethods,
  ChangeEventHandlers,
  DataConnect,
  EmitEventHandlers,
  EventHandlers,
  LifecycleEventHandlers,
  Listeners,
  PropTests,
  Properties,
  States
} = require('./sections')


const prepareClasses = {
  ApiMethods,
  ChangeEventHandlers,
  DataConnect,
  EmitEventHandlers,
  EventHandlers,
  LifecycleEventHandlers,
  Listeners,
  Properties,
  PropTests,
  States
}

function createTemplateData(ctx, opts) {
  return new TemplateData(ctx, opts)
}

class TemplateData extends Loggable {
  constructor(ctx, opts = {}) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
    this.model = ctx.model
    this.decorators = {}

    // hook-up prepare classes
    const prepareClassNames = Object.keys(prepareClasses)
    prepareClassNames.map(clazzName => {
      const key = clazzName.camelize(false)
      const clazz = prepareClasses[clazzName]
      this[key] = new clazz(ctx, opts)
    })
    this.template = {}

    this.validate()
  }

  validate() {
    if (!this.props) {
      this.handleError('missing props (from ctx argument)')
    }
    if (!this.model) {
      this.handleError('missing model (from ctx argument)')
    }
  }

  get declarationNames() {
    const allSections = [
      'properties',
      'apiMethods',
      'changeEventHandlers',
      'states',
      'eventHandlers',
      'lifecycleEventHandlers',
      'emitEventHandlers',
      'listeners',
      'propTests',
      'dataConnect'
    ] // .map(name => name.camelize())
  }

  get declarationBlocks() {
    return this.declarationNames.map(name => {
      return this[name].declarations
    })
  }

  buildAll() {
    this
      .buildProps()
      .buildApiMethods()
      .buildChangeEventHandlers()
      .buildComponentDataConnect()
      .buildLifeCycleEventHandlers()
      .buildEmitEventHandlers()
      .buildEventHandlers()
      .buildState()
      .buildListeners()
      .buildInterfaceProps()
      .buildPropertyTests()

    return this
  }

  buildPropertyTests() {
    this.template.tests = this.propTests.prepareData()
    return this
  }

  buildApiMethods() {
    this.template.apiMethods = this.apiMethods.prepareData()
    return this
  }

  buildComponentDataConnect() {
    this.template.componentDataConnect = this.dataConnect.prepareData()
    return this
  }

  buildChangeEventHandlers() {
    if (!this.template.properties.changeList) {
      this.handleError('buildChangeEventHandlers: ChangeEventHandlers requires first preparing template.properties')
    }

    this.template.changeHandlers = this.changeHandlers.prepareData({
      changeList: this.template.properties.changeList
    })
    return this
  }

  buildLifecycleEventHandlers() {
    this.template.lifecycleEventHandlers = this.lifecycleEventHandlers.prepareData()
    return this
  }

  buildEmitEventHandlers() {
    this.template.emitEventHandlers = this.emitEventHandlers.prepareData()
    return this
  }

  buildEventHandlers() {
    this.template.eventHandlers = this.eventHandlers.prepareData()
    return this
  }

  buildListeners() {
    this.template.listeners = this.listeners.prepareData()
    return this
  }

  buildState() {
    this.template.states = this.states.prepareData()
    return this
  }

  buildInterfaceProps() {
    this.template.interfaceProps = this.properties.names.map(name => {
      return `      ${name}?: any;`
    }).join('\n')
    return this
  }

  buildProps() {
    this.template.properties = this.props.prepareData()
    return this
  }
}

module.exports = {
  createTemplateData,
  TemplateData
}
