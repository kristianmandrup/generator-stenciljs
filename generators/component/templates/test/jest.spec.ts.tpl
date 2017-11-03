import { flush, render } from '@stencil/core/testing';
import { <%= className %> } from '../<%= componentFileName %>';

describe('<%= tagName %>', () => {
  it('should build', () => {
    expect(new <%= className %>()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [<%= className %>],
        html: '<<%= tagName %>></<%= tagName %>>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toMatch(/<%= className %>/);
    });

    <%= propTests %>
  });
});
