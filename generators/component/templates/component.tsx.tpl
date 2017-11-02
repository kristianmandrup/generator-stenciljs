import { Component, Prop } from '@stencil/core'


@Component({
  tag: '<%= tagName %>',
  styleUrl: '<%= styleFileName %>.<%= styleExt %>'
})
export class <%= className %> {

  <% for (name of propNames) { %>
  @Prop() <%= name: propMap[name]%>
  <% }  %>

  render() {
    return (
      <<%= wrapperTagName %>>
        <%= className %><% for (name of propNames) { %>$\{this.<%= name %>\}:<% } %>
      </<%= wrapperTagName %>>
    )
  }
}
