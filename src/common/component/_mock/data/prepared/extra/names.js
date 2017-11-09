module.exports = {
  byName: {
    component: {
      name: 'my-component',
      fileName: 'my-component'
    },
    dts: {
      fileName: 'my-component'
    },
    interface: {
      fileName: 'my-component'
    },
    style: {
      fileName: 'my-component',
      ext: 'scss',
      filePath: 'my-component.scss'
    },
    test: {
      fileName: 'my-component',
      ext: 'spec.ts',
      filePath: 'my-component.spec.ts',
      lib: 'jest'
    },
    byType: {
      component: {
        name: 'my-component',
        fileName: 'component'
      },
      dts: {
        fileName: 'definitions'
      },
      interface: {
        fileName: 'interface'
      },
      style: {
        fileName: 'styles'
      },
      test: {
        fileName: 'unit'
      }
    }
  }
}
