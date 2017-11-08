const name = {
  name: 'name',
  type: 'input',
  default: 'my-component',
  message: 'Component name'
}

const useShadow = {
  name: 'useShadowDOM',
  type: 'confirm',
  default: false,
  message: 'Add Shadow DOM'
}

const assetsDir = {
  name: 'assetsDir',
  type: 'input',
  default: 'assets',
  message: 'Assets dir'
}

const propStr = {
  name: 'propStr',
  type: 'input',
  message: 'Props (name:string,age:number ...)',
}

const apiMethodsStr = {
  name: 'apiMethodsStr',
  type: 'input',
  message: 'API methods (showToast,addItem, ...)',
}

const eventStr = {
  name: 'eventStr',
  type: 'input',
  message: 'Event handlers (activate,execute, ...)',
}

const eventEmitStr = {
  name: 'eventEmitStr',
  type: 'input',
  message: 'Event emitters (start,stop, ...)',
}

const listenStr = {
  name: 'listenStr',
  type: 'input',
  message: 'Event listeners (open,run, ...)',
}

const lifeCycleEvents = {
  name: 'lifeCycleEvents',
  type: 'checkbox',
  default: ['DidLoad', 'DidUnload'],
  choices: [
    'WillLoad',
    'DidLoad',
    'WillUpdate',
    'DidUpdate',
    'DidUnload'
  ],
  message: 'Lifecycle event handlers',
  store: true
}

const wrapperFileTag = {
  name: 'wrapperFileTag',
  type: 'input',
  default: 'div',
  message: 'Wrapper tag name'
}

const convention = {
  name: 'convention',
  type: 'list',
  default: 'type', // options.convention ||
  choices: [
    'name',
    'type'
  ],
  message: 'File naming by',
  store: true
}

const testLib = {
  name: 'testLib',
  type: 'radio',
  default: 'jest',
  choices: [
    'jest'
  ],
  message: 'Testing lib',
  store: true
}

const styleFileExt = {
  name: 'styleFileExt',
  type: 'radio',
  default: 'scss',
  choices: [
    'scss',
    'styl',
    'css'
  ],
  message: 'Style file',
  store: true
}

const testFileExt = {
  name: 'testFileExt',
  type: 'radio',
  default: 'spec.ts',
  choices: [
    'spec.ts',
    'test.ts'
  ],
  message: 'Test file',
  store: true
}

const useDataService = {
  name: 'useDataService',
  type: 'confirm',
  default: false,
  message: 'Connect to a data service'
}

module.exports = {
  name,
  useShadow,
  assetsDir,
  propStr,
  apiMethodsStr,
  eventStr,
  eventEmitStr,
  listenStr,
  lifeCycleEvents,
  wrapperFileTag,
  convention,
  testLib,
  styleFileExt,
  testFileExt,
  useDataService
}
