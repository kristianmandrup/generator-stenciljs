const {
  TemplateWriter,
  createTemplateWriter
} = require('./template')
const template = require('./template')

const {
  createRegistrator,
  Registrator
} = require('./registrator')

const registrator = require('./registrator')

module.exports = {
  createTemplateWriter,
  createRegistrator,
  Registrator,
  TemplateWriter,
  template,
  registrator
}
