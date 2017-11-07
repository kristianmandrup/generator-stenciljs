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
  Props,
  State
} = require('./sections')


const prepareClasses = {
  ApiMethods,
  ChangeEventHandlers,
  DataConnect,
  EmitEventHandlers,
  EventHandlers,
  LifecycleEventHandlers,
  Listeners,
  Props,
  PropTests,
  State
}

function createTemplateData(props) {
  return new TemplateData(props)
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

    console.log({
      prepareClassNames
    })
    prepareClassNames.map(clazzName => {
      const key = clazzName.camelize(false)
      const clazz = prepareClasses[clazzName]
      console.log({
        clazzName,
        prepareClasses
      })

      this[key] = new clazz(ctx, opts)
    })
    this.template = {}
  }

  get declarationNames() {
    return [
      'properties',
      // 'apiMethods',
      // 'changeHandlers',
      // 'states',
      // 'eventHandlers',
      // 'lifecycleEventHandlers',
      // 'eventEmitters',
      // 'listeners',
      // 'componentDataConnect'
    ]
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
    this.template.tests = propTests.prepareData()
    return this
  }

  buildApiMethods() {
    this.template.apiMethods = apiMethods.prepareData()
    return this
  }

  buildComponentDataConnect() {
    this.template.componentDataConnect = dataConnect.prepareData()
    return this
  }

  buildChangeEventHandlers() {
    if (!this.template.properties.changeList) {
      this.handleError('buildChangeEventHandlers: ChangeEventHandlers requires first preparing template.properties')
    }

    this.template.changeHandlers = changeHandlers.prepareData({
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
    this.template.properties = props.build()
    return this
  }
}

module.exports = {
  createTemplateData,
  TemplateData
}
