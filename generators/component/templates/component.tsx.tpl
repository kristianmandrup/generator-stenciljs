<% if (dataServiceImports) { %><%= dataServiceImports %><% } %>import { Component, Prop } from '@stencil/core'

@Component({
  tag: '<%= tagName %>',
  styleUrl: 'styles/<%= styleFileName %>.<%= styleFileExt %>'
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
