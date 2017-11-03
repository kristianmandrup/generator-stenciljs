import { <%= className %> } from './<%= componentFileName %>';

export interface <%= htmlElementName %> extends <%= className %>, HTMLElement {
}
declare var <%= htmlElementName %>: {
  prototype: <%= htmlElementName %>;
  new(): <%= htmlElementName %>;
};
declare global {
  interface <%= htmlElementName %>Map {
    "my-name": <%= htmlElementName %>;
  }
  interface ElementTagNameMap {
    "my-name": <%= htmlElementName %>;
  }
  namespace JSX {
    interface IntrinsicElements {
      "my-name": JSXElements.<%= className %>Attributes;
    }
  }
  namespace JSXElements {
    export interface <%= className %>Attributes extends HTMLAttributes {
<%= interfaceProps %>
    }
  }
}
