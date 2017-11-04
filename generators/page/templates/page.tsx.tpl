import { <%= coreImports %> } from '@stencil/core'
@Component({
  tag: '<%= tagName %>',
  styleUrl: '<%= styleFile %>'
})
export class <%= className %> {
<%- declarations %>

  render() {
    return (
      <%- openTag %>
        <stencil-router>
          <%- routeTags %>
        </stencil-router>
      <%- closeTag %>
    )
  }
}
