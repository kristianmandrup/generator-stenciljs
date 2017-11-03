import { Component, Prop } from '@stencil/core'

@Component({
  tag: '<%= tagName %>',
  styleUrl: '<%= styleFileName %>.<%= styleFileExt %>'
})
export class <%= className %> {
<%= declareProps %>

  render() {
    return (
      <%- openTag %>
        <%= className %>
<%= displayProps %>
      <%- closeTag %>
    )
  }
}
