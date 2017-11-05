<%= imports %>

@Component({
  tag: '<%= tag.name %>',
  styleUrl: '<%= style.filePath %>'
})
export class <%= className %> {
<%- declarations %>

  render() {
    return (
      <%- tag.open %>
        <%- tag.content %>
      <%- tag.close %>
    )
  }
}
