export function pageData(props) {
  const {
    fieldStr
  } = props

  if (fieldStr) {
    fieldList = fieldStr.split(',').filter(name => !name.isBlank())
    fieldMap = fieldList.reduce((acc, field) => {
      let [name, type, value] = field.split(':')
      // always reference tag name of component
      fieldName = name.camelize(false)
      acc[fieldName] = {
        type,
        value
      }
      return acc
    }, {})
  }

  const fieldNames = Object.keys(fieldMap)
  const fieldTags = fieldNames.map(name => {
    let {
      type,
      value
    } = fieldMap[name]
    let labelOpen = `    <label for="${name}">${label}`
    let labelClose = `    </label>`
    let props = []
    if (value) {
      props = [` value="${value}"`]
    }
    let propsStr = props.join(' ')
    let field = `      <input name="${name}" type="${type}" onInput={() => this.handleInputChange(event)} ${propsStr}/>`

    let fieldWLabel = [labelOpen, field, labelClose]
  }).join('\n')

  return {
    fieldTags
  }
}
