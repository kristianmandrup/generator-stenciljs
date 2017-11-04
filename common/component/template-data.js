export function createTemplatethis(props) {
  return new Templatethis(props)
}

export class Templatethis {
  constructor(props) {
    this.props = props
  }

  get blocks() {
    return [
      this.states.declarations,
      this.properties.declarations,
      this.eventHandlers.declarations,
      this.changeHandlers.declarations,
      this.lifecycleEventHandlers.declarations,
      this.eventEmitters.declarations,
      this.listeners.declarations,
      this.componentDataConnect.declarations
    ]
  }


  buildAll() {
    this
      .buildComponentDataConnect()
      .buildChangeEventHandlers()
      .buildLifeCycleEventHandlers()
      .buildEmitEventHandlers()
      .buildEventHandlers()
      .buildState()
      .buildListeners()
      .buildProps()

    return this
  }

  buildComponentDataConnect() {
    const componentDataConnect = {}
    this.componentDataConnect = componentDataConnect

    if (this.props.useDataService) {
      componentDataConnect.declarations = ` @Prop({connect: '${tagName}-data-service-injector'}) injector: I${className}DataServiceInjector;
    private dataService: ${className}DataService;

    componentWillLoad() {
        this.injector.create().then(dataService => {
            this.dataService = dataService;
            console.log(this.dataService.getData());
        });
    }\n`
    }
  }

  buildChangeEventHandlers() {
    const changeHandlers = {}
    this.changeHandlers = changeHandlers
    const {
      eventEmitStr
    } = this.props

    const {
      changeList
    } = this.properties

    changeHandlers.declarations = changeList.map(changeObj => {
      let {
        name,
        type,
        when
      } = changeObj
      const propClassName = name.camelize()
      when = when || 'did'
      return `  @PropWillChange('${name}')
${when}Change${propClassName}(newValue: ${type}) {
  console.log('${propClassName} will change', newValue)
}`
    }).join('\n')

    return this
  }

  get lifecycleExplainMap() {
    return {
      WillLoad: 'is about to be rendered',
      DidLoad: 'has been rendered',
      WillUpdate: 'will update',
      DidUpdate: 'did update',
      DidUnload: 'tag has been removed from the DOM'
    }
  }

  buildLifeCycleEventHandlers() {
    const lifecycleEvents = {
      handlers: ''
    }
    const {
      lifeCycleEvents
    } = this.props

    lifecycleEvents.handlers = lifeCycleEvents.map(name => {
      let lifecycleName = name.camelize()
      let explanation = this.lifecycleExplainMap[lifecycleName]
      return `  component${lifecycleName}() {
  console.log('The component ${explanation}');
}`
    }).join('\n')
    return this
  }

  buildEmitEventHandlers() {
    const emitEvents = {
      names: []
    }
    this.emitEvents = emitEvents
    const {
      eventEmitStr
    } = this.props

    if (eventEmitStr) {
      emitEvents.names = this._strToList(eventEmitStr)
    }

    emitEvents.declarations = emitEvents.names.map(eventName => {
      eventName = eventName.camelize();
      return `@Event() ${eventName}: EventEmitter`
    }).join('\n')
    return this
  }

  buildEventHandlers() {
    const events = {
      names: []
    }
    this.events = events
    const {
      eventStr
    } = this.props

    if (eventStr) {
      events.names = this._strToList(eventStr)
    }

    events.handlers = events.names.map(eventName => {
      eventName = eventName.camelize();
      return `  handle${eventName}(event: UIEvent) {
      console.log('Received the ${eventName}', {
        event
      });
    }`
    }).join('\n')
    return this
  }

  buildListeners() {
    const listeners = {}
    this.listeners = listeners
    const {
      listenStr
    } = this.props

    if (listenStr) {
      listeners.names = this._strToList(listenStr)
      listeners.display = listeners.names.reduce((acc, prop) => {
        let [name, type] = prop.split(':')
        let eventType = type || 'CustomEvent'
        let eventName = name.camelize(false)
        acc[key] = `      @Listen('${eventName}')
      ${eventName}Handler(event: ${eventType}) {
        console.log('Received the custom ${eventName} event: ', event.detail);
      }`
        return acc
      }).join('\n')
    }
    return this
  }

  _strToList(str) {
    return str.split(',').map(txt => tx.trim()).filter(txt => !txt.isBlank())
  }


  buildState() {
    const states = {}
    this.states = states
    const {
      stateStr
    } = this.props
    if (stateStr) {
      states.names = this._strToList(stateStra)
      states.declarations = states.names.reduce((acc, prop) => {
        let [name, type] = prop.split(':')
        type = type || 'any'
        let stateName = name.camelize(false)
        acc[key] = `  @State() ${stateName}: ${type};`
        return acc
      }).join('\n')
    }
    return this
  }

  buildProps() {
    const properties = {
      list: [],
      obj: {},
      changeList: []
    }
    this.properties = properties
    const {
      propStr
    } = this.props

    if (propStr) {
      properties.list = this._strToList(propStr)
      properties.obj = properties.list.reduce((acc, prop) => {
        let [name, type, when] = prop.split(':')
        if (when) {
          properties.changeList.push({
            name,
            type,
            when
          })
        }
        acc[name] = type || 'string'
        return acc
      }, {})
    }

    properties.names = Object.keys(properties.obj)
    properties.declarations = properties.names.map(name => {
      return `  @Prop() ${name}: ${properties.obj[name]};`
    }).join('\n')

    properties.renderValues = properties.names.map(name => {
      return '        {this.' + name + '}'
    }).join('\n')
    return this
  }
}
