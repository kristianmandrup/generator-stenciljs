const {
  Loggable
} = require('../../../logger')

class TemplateValidator extends Loggable {
  constructor(ctx = {}, opts = {}) {
    super(opts)
    this.model = ctx.data.model || {}
  }

  // call validateEntityData for all entities in object?
  validateData(data) {
    if (typeof data !== 'object') {
      this.handleError('data must be an Object', {
        data
      })
    }
    const names = Object.keys(data)
    names.map(name => {
      this.validateEntityData(name)
    })
    return data
  }

  validateEntity(name, opts = {}) {
    const entityName = name.camelize(false)
    const entity = this.model[entityName]
    if (!entity) {
      this.handleError(`${entityName} is missing from model`, {
        model: this.model,
        entityName
      })
    }
    opts.props.map(name => {
      if (!entity[name]) {
        this.handleError(`${entityName} missing required ${name} property`, {
          [entityName]: entity
        })
      }
    })
    return entity
  }

  validateEntityData(name) {
    const entityName = name.camelize(false)
    const entityData = this.model[entityName]
    const validations = entityName ? this.entityTemplateRequirements[entityName] : {}
    const props = (validations || {}).props || []
    props.map(name => {
      if (!entityData[name]) {
        this.handleError(`${entityName} missing required template property: ${name}`, {
          data: entityData
        })
      }
    })
    return entityData
  }

  get entityTemplateRequirements() {
    return {
      component: {
        // props required for template rendering
        props: [
          'imports',
          'tag',
          'style',
          'className'
        ]
      },
      definitions: {
        props: [
          'htmlElementName',
          'fileName'
        ]
      },
      interface: {
        props: [
          'htmlElementName',
          'fileName',
          'className',
          'props'
        ]
      },
      styles: {
        props: [
          'tag'
        ]
      },
      dataService: {
        props: [
          'className'
        ]
      }
    }
  }
}

function createTemplateValidator(name, model, opts) {
  return new TemplateValidator(name, model, opts)
}

module.exports = {
  createTemplateValidator,
  TemplateValidator
}
