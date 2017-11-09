const {
  BasePrepare
} = require('./_base')

function createPropTests(ctx, opts) {
  return new PropTests(ctx, opts)
}

class PropTests extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
    this.checkHas('properties')
  }

  /**
   * - propertySpecs
   */
  prepareData() {
    return this.names ? this.values : {}
  }

  get names() {
    return this.properties.names
  }

  get propertySpecs() {
    return this.buildBlockList(this.names, name => {
      return `    it('should display the ${name}', async () => {
element.${name} = '${name}';
await flush(element);
expect(element.textContent).toMatch(/${name}/);
});`
    })
  }

  get values() {
    const {
      propertySpecs
    } = this
    return {
      propertySpecs
    }
  }
}

module.exports = {
  PropTests,
  createPropTests
}
