<% if (dataServiceImports) { %><%= dataServiceImports %><% } %>import { <%= coreImports %> } from '@stencil/core'

@Component({
  tag: '<%= tagName %>',
  styleUrl: '<%= styleFileName %>.<%= styleFileExt %>'
})
export class <%= className %> {
<%- declarations %>

  render() {
    return (
      <%- openTag %>
        <%- displayBlocks %>
      <%- closeTag %>
    )
  }
}
