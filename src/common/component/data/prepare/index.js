const sections = require('./sections')
const {
  createTemplateData,
  TemplateData
} = require('./template-data')

// alias
const DataPreparer = TemplateData
const createDataPreparer = createTemplateData

module.exports = {
  sections,
  createTemplateData,
  TemplateData,

  // alias
  DataPreparer,
  createDataPreparer
}
