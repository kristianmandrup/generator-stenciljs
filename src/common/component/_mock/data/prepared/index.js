// mocked prepared data for Component generator
const component = require('./component')
const _interface = require('./interface')
const tests = require('./tests')

module.exports = {
  component,
  interface: _interface,
  style: {
    fileName: 'my-hello',
    // containerDir: 'components',
    ext: 'scss',
    tag: {
      name: 'my-hello'
    }
  },
  definitions: {
    htmlElementName: 'my-hello',
    fileName: 'my-hello',
    // containerDir: 'components',
  },
  tests
}
