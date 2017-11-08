<%= imports %>

@Component({
  tag: '<%= tag.name %>',
  styleUrl: '<%= style.filePath %>'
})
export class <%= className %> {
  @Element() $el: HTMLElement;
<%- declarations %>

  render() {
    return (
      <%- tag.open %>
        <%- tag.content %>
      <%- tag.close %>
    )
  }
}
