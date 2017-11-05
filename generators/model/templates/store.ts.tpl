import {
  action
} from 'mobx/lib/mobx';
import {
  extendObservable
} from 'mobx';

class <%= className %> {
  // props
  <%= declaredProps %>

  constructor() {
    // add observable props and action handlers
    extendObservable(this, {
<%= observableProps %>
<%= actionsHandlers %>
    })

    // init props
<%= initProps %>
  }
}
