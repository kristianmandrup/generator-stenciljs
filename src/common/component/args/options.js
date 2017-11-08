function createOptions(ctx) {
  ctx.option('skip', {
    type: Boolean,
    required: false,
    default: false,
    desc: 'Skip prompts for any option or argument passed',
  });

  ctx.option('props', {
    type: String,
    required: false,
    default: '',
    desc: 'Comma separated Props',
  });

  ctx.option('events', {
    type: String,
    required: false,
    default: '',
    desc: 'Comma separated Event handlers',
  });

  ctx.option('wrapperTagName', {
    type: String,
    required: false,
    default: 'div',
    desc: 'Wrapper tag name',
  });

  ctx.option('convention', {
    type: String,
    required: false,
    default: 'type',
    desc: 'Naming convention to use',
  });

  ctx.option('testLib', {
    type: String,
    required: false,
    default: 'jest',
    desc: 'Testing lib',
  });

  ctx.option('styleFileExt', {
    type: String,
    required: false,
    default: 'scss',
    desc: 'Style file extension',
  });

  ctx.option('testFileExt', {
    type: String,
    required: false,
    default: 'spec.ts',
    desc: 'Test file extension',
  });
}

module.exports = {
  createOptions
}
