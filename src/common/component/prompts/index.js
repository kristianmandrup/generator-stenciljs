function buildPrompts(options, defaults = {}, filter) {
  let defName = defaults['name']

  if (!defName) {
    throw new Error('buildPrompts: Missing name defaults for prompt')
  }

  let prompts = all(options, defaults)
  if (filter && filter.length > 0) {
    prompts = prompts.filter(prompt => {
      return filter.includes(prompt.name)
    })
  }

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
