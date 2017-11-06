function buildPrompts(options, defaults = {}) {
  let defName = defaults['name']

  if (!defName) {
    throw new Error('buildPrompts: Missing name defaults for prompt')
  }

  const prompts = [{
    name: 'name',
    type: 'input',
    default: options.name || defName.default || 'my-component',
    message: defName.message || 'Component name'
  }, {
    name: 'propStr',
    type: 'input',
    default: options.props,
    message: 'Props (name:string,age:number ...)',
  }, {
    name: 'eventStr',
    type: 'input',
    default: options.events,
    message: 'Event handlers (activate,execute, ...)',
  }, {
    name: 'eventEmitStr',
    type: 'input',
    default: options.eventEmitters,
    message: 'Event emitters (start,stop, ...)',
  }, {
    name: 'listenStr',
    type: 'input',
    default: options.listeners,
    message: 'Event listeners (open,run, ...)',
  }, {
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
  }, {
    name: 'wrapperFileTag',
    type: 'input',
    default: options.wrapperTag || 'div',
    message: 'Wrapper tag name'
  }, {
    name: 'convention',
    type: 'list',
    default: 'type', // options.convention ||
    choices: [
      'name',
      'type'
    ],
    message: 'File naming by',
    store: true
  }, {
    name: 'testLib',
    type: 'radio',
    default: options.testLib || 'jest',
    choices: [
      'jest'
    ],
    message: 'Testing lib',
    store: true
  }, {
    name: 'styleFileExt',
    type: 'radio',
    default: options.styleExt || 'scss',
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
    default: options.testExt || 'spec.ts',
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

  if (options.skip) {
    // filter away any prompt object whose name is found in options object
    prompts = prompts.filter(prompt => {
      return !options[prompt.name]
    })
  }
  return prompts
}

module.exports = {
  buildPrompts
}
