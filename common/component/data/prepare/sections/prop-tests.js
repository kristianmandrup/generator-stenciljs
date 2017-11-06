const {
  BasePrepare
} = require('./_base')

class Props extends BasePrepare {
  constructor(model = {}, opts = {}) {
    super(model, opts)
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
    this.properties.names ? this.value : {}
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
    const vals = {
      propertySpecs
    } = this
    return vals
  }
}
