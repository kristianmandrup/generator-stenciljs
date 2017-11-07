const {
  Templator
} = require('./templator')
const {
  TemplateValidator
} = require('./validator')
const {
  TemplateWriter,
  createTemplateWriter,
} = require('./writer')

module.exports = {
  Templator,
  TemplateValidator,
  TemplateWriter,
  createTemplateWriter
}
