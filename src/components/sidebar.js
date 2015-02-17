'use strict';

import Ractive from 'ractive';

import template from './sidebar.html';

var component = Ractive.extend({
  isolated: true,
  template: template,

  data: {
    flows: [],
    privateConversations: []
  }
});

Ractive.components.xSidebar = component;

export {component};
