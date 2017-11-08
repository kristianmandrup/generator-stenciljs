import { <%= coreImports %> } from '@stencil/core'
@Component({
  tag: '<%= tag.name %>',
  styleUrl: '<%= style.filePath %>'
})
export class <%= className %> {
<%- declarations %>

  render() {
    return (
      <%- tago.open %>
        <stencil-router>
          <%- routeTags %>
        </stencil-router>
      <%- tag.close %>
    )
  }
}
