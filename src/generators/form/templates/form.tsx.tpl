import { <%= coreImports %> } from '@stencil/core'
@Component({
  tag: '<%= tag.name %>',
  styleUrl: '<%= style.filePath %>'
})
export class <%= className %> {
<%- declarations %>

  handleFormSubmit(e) {
    console.log('submit', e)
  }

  handleInputChange(event) {
    console.log('Input change', e)
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <%- fieldTags %>
      </form>
    )
  }
}
