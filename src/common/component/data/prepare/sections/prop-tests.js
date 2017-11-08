const {
  BasePrepare
} = require('./_base')

class PropTests extends BasePrepare {
  constructor(ctx, opts = {}) {
    super(ctx, opts)
  }

  /**
   * - list
   * - obj
   * - names
   * - declarations
   * - changeList
   * - renderProps
   * - decorators
   */
  prepareData() {
    return this.properties.names ? this.value : {}
  }

  get propertySpecs() {
    return this.buildBlockList(this.properties.names, name => {
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
  PropTests
}
