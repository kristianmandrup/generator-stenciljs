function createArguments(ctx) {
  ctx.argument('name', {
    type: String,
    required: false,
    default: 'my-component',
    desc: 'Name of your component'
  });
}

module.exports = {
  createArguments
}
