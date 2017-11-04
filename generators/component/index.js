export class BaseComponentGenerator extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  // either compose with boilerplate or element

  get _prompts() {
    return [{
      name: 'componentModule',
      type: confirm,
      default: false,
      message: 'Full Component module',
    }]
  }

  default () {
    if (this.props.componentModule) {
      this.composeWith(require.resolve('../boilerplate'), {});
    } else {
      this.composeWith(require.resolve('../element'), {});
    }
  }

  end() {
    // this.success('Component created :)')
  }
}
