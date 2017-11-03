'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const extend = _.merge;
const Sugar = require('sugar');
const path = require('path');
const ejsLint = require('ejs-lint')
const fs = require('fs-extra');

// extend String with sugarjs API
Sugar.String.extend()
module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.argument('name', {
      type: String,
      required: false,
      default: 'my-component',
      desc: 'Name of your component'
    });

    this.option('props', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated Props',
    });

    this.option('events', {
      type: String,
      required: false,
      default: '',
      desc: 'Comma separated Event handlers',
    });

    this.option('wrapperTagName', {
      type: String,
      required: false,
      default: 'div',
      desc: 'Wrapper tag name',
    });

    this.option('convention', {
      type: String,
      required: false,
      default: 'type',
      desc: 'Naming convention to use',
    });

    this.option('testLib', {
      type: String,
      required: false,
      default: 'jest',
      desc: 'Testing lib',
    });

    this.option('styleFileExt', {
      type: String,
      required: false,
      default: 'scss',
      desc: 'Style file extension',
    });

    this.option('testFileExt', {
      type: String,
      required: false,
      default: 'spec.ts',
      desc: 'Test file extension',
    });
  }

  _byConvention() {
    let method = `_by${this.props.convention.capitalize()}`
    return this[method]()
  }

  _byName() {
    const name = this.tagName
    const nameMap = {
      componentName: name,
      componentFileName: name,
      dtsFileName: name,
      interfaceFileName: name,
      styleFileName: name,
      testFileName: name
    }
    return nameMap
  }

  _byType() {
    const name = this.tagName
    const nameMap = {
      componentName: name,
      componentFileName: 'component',
      dtsFileName: 'definition',
      interfaceFileName: 'interface',
      styleFileName: 'styles',
      testFileName: 'unit'
    }
    return nameMap
  }

  initializing() {}

  prompting() {
    // Have Yeoman greet the user.
    const msg = yosay(`Welcome to ${chalk.red('stenciljs')} component generator`);
    this.log(msg);

    const prompts = [{
      name: 'name',
      type: 'input',
      default: this.options.name || 'my-component',
      message: 'Name of your component'
    }, {
      name: 'propStr',
      type: 'input',
      default: this.options.props,
      message: 'Props (name:string,age:number ...)',
    }, {
      name: 'eventStr',
      type: 'input',
      default: this.options.events,
      message: 'Event handlers (activate,execute, ...)',
    }, {
      name: 'eventEmitStr',
      type: 'input',
      default: this.options.eventEmitters,
      message: 'Event emitters (start,stop, ...)',
    }, {
      name: 'listenStr',
      type: 'input',
      default: this.options.listeners,
      message: 'Event listeners (open,run, ...)',
    }, {
      name: 'wrapperFileTag',
      type: 'input',
      default: this.options.wrapperTag || 'div',
      message: 'Wrapper tag name'
    }, {
      name: 'convention',
      type: 'list',
      default: 'type', // this.options.convention ||
      choices: [
        'name',
        'type'
      ],
      message: 'File naming by',
      store: true
    }, {
      name: 'testLib',
      type: 'radio',
      default: this.options.testLib || 'jest',
      choices: [
        'jest'
      ],
      message: 'Testing lib',
      store: true
    }, {
      name: 'styleFileExt',
      type: 'radio',
      default: this.options.styleExt || 'scss',
      choices: [
        'scss',
        'styl',
        'css'
      ],
      message: 'Style file',
      store: true
    }, {
      name: 'testFileExt',
      type: 'radio',
      default: this.options.testExt || 'spec.ts',
      choices: [
        'spec.ts',
        'test.ts'
      ],
      message: 'Test file',
      store: true
    }, {
      name: 'useDataService',
      type: 'confirm',
      default: false,
      message: 'Connect to a data service'
    }]

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _lintEJS(template, options = {}) {
    let templatePath = path.join(__dirname, 'templates', template)
    let templateContent = fs.readFileSync(templatePath, 'utf-8')
    let result = ejsLint(templateContent, options)
  }


  writing() {
    const name = this.props.name
    const tagName = name.dasherize();
    const className = name.camelize();

    this.name = name
    this.tagName = tagName
    this.className = className

    let componentConnectBlock = ''
    if (this.props.useDataService) {
      componentConnectBlock = ` @Prop({connect: '${tagName}-data-service-injector'}) injector: I${className}DataServiceInjector;
      private dataService: ${className}DataService;

      componentWillLoad() {
          this.injector.create().then(dataService => {
              this.dataService = dataService;
              console.log(this.dataService.getData());
          });
      }\n`
    }

    let dataServiceImports
    if (this.props.useDataService) {
      dataServiceImports = `import { ${className}DataService, I${className}DataServiceInjector } from './data-service'\n`
    }

    const {
      componentName,
      componentFileName,
      dtsFileName,
      interfaceFileName,
      styleFileName,
      testFileName
    } = this._byConvention();

    let {
      propStr,
      styleFileExt,
      testFileExt,
      wrapperTagName,
      testLib
    } = this.props

    wrapperTagName = wrapperTagName || 'div'
    let openTag = `<${wrapperTagName}>`
    let closeTag = `</${wrapperTagName}>`

    let propList = []
    let propMap = {}
    let changeList = []

    if (propStr) {
      propList = propStr.split(',').filter(name => !name.isBlank())
      propMap = propList.reduce((acc, prop) => {
        let [name, type, when] = prop.split(':')
        if (when) {
          changeList.push({
            name,
            type,
            when
          })
        }
        acc[name] = type || 'string'
        return acc
      }, {})
    }

    let states = []
    if (stateStr) {
      let stateNames = stateStr.split(',').filter(name => !name.isBlank())
      states = stateNames.reduce((acc, prop) => {
        let [name, type] = prop.split(':')
        type = type || 'any'
        let stateName = name.camelize(false)
        acc[key] = `  @State() ${stateName}: ${type};`
        return acc
      }).join('\n')
    }

    let listeners = []
    if (listenStr) {
      let listenNames = listenStr.split(',').filter(name => !name.isBlank())
      listeners = listenNames.reduce((acc, prop) => {
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


    let changeHandlers = changeList.map(changeObj => {
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


    let eventNames = []
    if (eventStr) {
      eventNames = eventStr.split(',').filter(name => !name.isBlank())
    }

    let eventEmitNames = []
    if (eventEmitStr) {
      eventEmitNames = eventEmitStr.split(',').filter(name => !name.isBlank())
    }

    const propNames = Object.keys(propMap)
    const htmlElementName = `HTML${className}Element`

    const componentDir = `components/${componentName}`

    const declareProps = propNames.map(name => {
      return `  @Prop() ${name}: ${propMap[name]};`
    }).join('\n')

    const displayProps = propNames.map(name => {
      return '        {this.' + name + '}'
    }).join('\n')


    const eventEmitters = eventEmitNames.map(eventName => {
      eventName = eventName.camelize();
      return `@Event() ${eventName}: EventEmitter`
    }).join('\n')


    const eventHandlers = eventNames.map(eventName => {
      eventName = eventName.camelize();
      return `  handle${eventName}(event: UIEvent) {
        console.log('Received the ${eventName}', {
          event
        });
      }`
    }).join('\n')

    // this._lintEJS('component.tsx.tpl')
    let componentDest = this.destinationPath(`${componentDir}/${componentFileName}.tsx`)

    let blocks = [states, declareProps, eventHandlers, changeHandlers, eventEmitters, listeners, componentConnectBlock]
    let declarations = blocks.filter(txt => txt).join('\n')

    // inside render
    let displayBlocks = [className, displayProps].filter(txt => txt && txt !== '').join('\n')

    this.fs.copyTpl(
      this.templatePath('component.tsx.tpl'),
      this.destinationPath(`${componentDir}/${componentFileName}.tsx`), {
        tagName,
        className,
        styleFileExt,
        styleFileName,
        wrapperTagName,
        openTag,
        closeTag,
        declarations,
        displayBlocks,
        dataServiceImports
      }
    );

    this.fs.copyTpl(
      this.templatePath('definition.d.ts.tpl'),
      this.destinationPath(`${componentDir}/${dtsFileName}.d.ts`), {
        className,
        interfaceFileName
      }
    );

    const interfaceProps = propNames.map(name => {
      return `      ${name}?: any;`
    }).join('\n')

    this.fs.copyTpl(
      this.templatePath('interface.ts.tpl'),
      this.destinationPath(`${componentDir}/${interfaceFileName}.ts`), {
        className,
        interfaceFileName,
        htmlElementName,
        interfaceProps,
        componentFileName
      }
    );

    this.fs.copyTpl(
      this.templatePath(`styles/styles.${styleFileExt}.tpl`),
      this.destinationPath(`${componentDir}/styles/${styleFileName}.${styleFileExt}`), {
        tagName,
      }
    );

    const propTests = propNames.map(name => {
      return `    it('should display the first ${name}', async () => {
      element.${name} = '${name}';
      await flush(element);
      expect(element.textContent).toMatch(/${name}/);
    });`
    }).join('\n')

    this.fs.copyTpl(
      this.templatePath(`test/${testLib}.spec.ts.tpl`),
      this.destinationPath(`${componentDir}/test/${testFileName}.${testFileExt}`), {
        tagName,
        className,
        propMap,
        propNames,
        propTests,
        componentFileName
      }
    );

    if (this.props.useDataService) {
      this.fs.copyTpl(
        this.templatePath(`data-service.ts.tpl`),
        this.destinationPath(`${componentDir}/data-service.ts`), {
          className,
        })
    }
  }
};
