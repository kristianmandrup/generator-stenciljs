import { <%= className %> } from './<%= componentFileName %>';

export interface <%= htmlElementName %> extends <%= className %>, HTMLElement {
}
declare var <%= htmlElementName %>: {
  prototype: <%= htmlElementName %>;
  new(): <%= htmlElementName %>;
};
declare global {
  interface <%= htmlElementName %>Map {
    "<%= tagName %>": <%= htmlElementName %>;
  }
  interface ElementTagNameMap {
    "<%= tagName %>": <%= htmlElementName %>;
  }
  namespace JSX {
    interface IntrinsicElements {
      "<%= tagName %>": JSXElements.<%= className %>Attributes;
    }
  }
  namespace JSXElements {
    export interface <%= className %>Attributes extends HTMLAttributes {
<%= interfaceProps %>
    }
  }
}
