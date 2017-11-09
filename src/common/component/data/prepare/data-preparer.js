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

function createDataPreparer(ctx, opts) {
  return new DataPreparer(ctx, opts)
}

class DataPreparer extends Loggable {
  constructor(ctx, opts = {}) {
    super(opts)
    this.ctx = ctx
    this.props = ctx.props
    this.model = ctx.model
    this.decorators = {}

    // console.log('TemplateData', {
    //   ctx
    // })

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
    if (typeof this.props !== 'object') {
      this.handleError('bad props in ctx', {
        props: this.props
      })
    }
    if (typeof this.model !== 'object') {
      this.handleError('bad model in ctx', {
        model: this.model
      })
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
    return allSections
  }

  get declarationBlocks() {
    return this.declarationNames.map(name => {
      let container = this[name] || {}
      let {
        declarations
      } = container
      return declarations || ''
    }).filter(txt => !txt.isBlank()).join('\n')
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
    if (!this.template.properties) {
      this.buildProps()
    }
    this.template.tests = this.propTests.prepareData(this.template.properties)
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
    this.template.properties = this.properties.prepareData()
    return this
  }
}

module.exports = {
  createDataPreparer,
  DataPreparer
}
