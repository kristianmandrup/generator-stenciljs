export function TemplateData(props) {
  return new TemplateData(props)
}

export class TemplateData {
  constructor(props) {
    this.props = props
    this.decorators = {}
  }

  get declarationNames() {
    return [
      'states',
      'properties',
      'eventHandlers',
      'changeHandlers',
      'lifecycleEventHandlers',
      'eventEmitters',
      'listeners',
      'componentDataConnect'
    ]
  }

  get declarationBlocks() {
    return this.declarationNames.map(name => {
      return this[name].declarations
    })
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
      .buildInterfaceProps()

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
      this.decorators['Prop'] = true
    }
    return this
  }

  buildChangeEventHandlers() {
    const changeHandlers = {}
    this.changeHandlers = changeHandlers
    const {
      changeList
    } = this.properties

    if (changeList) {
      changeHandlers.declarations = this.buildBlockList(changeList, changeObj => {
        let {
          name,
          type,
          when
        } = changeObj
        const propClassName = name.camelize()
        when = when || 'did'
        const whenClass = when.camelize()
        const decoratorClass = `Prop${whenClass}Change`
        return `  @${decoratorClass}('${name}')
  ${when}Change${propClassName}(newValue: ${type}) {
    console.log('${propClassName} will change', newValue)
  }`
      })
      this.decorators[decoratorClass] = true
    }
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

    lifecycleEvents.handlers = this.buildBlockList(lifeCycleEvents, name => {
      let lifecycleName = name.camelize()
      let explanation = this.lifecycleExplainMap[lifecycleName]
      return `  component${lifecycleName}() {
  console.log('The component ${explanation}');
}`
    })
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
      emitEvents.declarations = this.buildBlockList(emitEvents.names, eventName => {
        eventName = eventName.camelize();
        return `@Event() ${eventName}: EventEmitter`
      })
      this.decorators['Event'] = true
    }
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

    events.handlers = this.buildBlockList(events.names, eventName => {
      eventName = eventName.camelize();
      return `  handle${eventName}(event: UIEvent) {
      console.log('Received the ${eventName}', {
        event
      });
    }`
    })
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
      listeners.display = this.buildBlockObj(listeners.names, (acc, prop) => {
        let [name, type] = prop.split(':')
        let eventType = type || 'CustomEvent'
        let eventName = name.camelize(false)
        acc[key] = `      @Listen('${eventName}')
      ${eventName}Handler(event: ${eventType}) {
        console.log('Received the custom ${eventName} event: ', event.detail);
      }`
        return acc
      }).join('\n')
      this.decorators['Listen'] = true
    }
    return this
  }

  buildState() {
    const states = {}
    this.states = states
    const {
      stateStr
    } = this.props
    if (stateStr) {
      states.names = this._strToList(stateStra)
      states.declarations = this.buildBlockObj(states.names, (acc, prop) => {
        let [name, type] = prop.split(':')
        type = type || 'any'
        let stateName = name.camelize(false)
        acc[key] = `  @State() ${stateName}: ${type};`
        return acc
      }).join('\n')
      this.decorators['State'] = true
    }
    return this
  }

  buildInterfaceProps() {
    const interface = {}
    this.interface = interface
    interface.props = this.properties.names.map(name => {
      return `      ${name}?: any;`
    }).join('\n')
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
      properties.obj = this.buildBlockObj(properties.list, (acc, prop) => {
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
      })

      properties.names = Object.keys(properties.obj)

      // Prop declarations
      properties.declarations = this.buildBlockList(properties.names, name => {
        return `  @Prop() ${name}: ${properties.obj[name]};`
      })

      // goes in the render method of component
      properties.renderProps = this.buildBlockList(properties.names, name => {
        return '        {this.' + name + '}'
      })
      this.decorators['Prop'] = true
    }
    return this
  }

  _strToList(str) {
    return str.split(',').map(txt => tx.trim()).filter(txt => !txt.isBlank())
  }

  buildBlockList(list, buildFun) {
    return list.map(item => {
      return buildFun(item)
    }).join('\n')
  }

  buildBlockObj(list, buildFun) {
    return list.reduce((acc, item) => {
      return acc = buildFun(acc, item)
    }, {})
  }
}
