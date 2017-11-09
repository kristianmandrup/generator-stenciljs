module.exports = {
  name: 'my-hello',
  className: 'MyHello',
  containerDir: 'components',
  fileName: 'my-hello',
  imports: ['Component', 'Prop'],
  declarations: `  @Prop
name: string`,
  style: {
    fileName: 'my-hello',
    ext: 'scss'
  },
  tag: {
    open: '<div>',
    close: '<div/>',
    content: 'hello world'
  }
}
