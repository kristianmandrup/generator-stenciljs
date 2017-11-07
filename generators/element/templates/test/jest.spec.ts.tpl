import { flush, render } from '@stencil/core/testing';
import { <%= className %> } from '../<%= fileName %>';

describe('<%= tag.name %>', () => {
  it('should build', () => {
    expect(new <%= className %>()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [<%= className %>],
        html: '<<%= tag.name %>></<%= tag.name %>>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toMatch(/<%= className %>/);
    });

<%- propertySpecs %>
  });
});
