'use strict';

import Ractive from 'ractive';

import Rooms from '../rooms';
import template from './sidebar.html';

var sidebar =
  Ractive.components.xSidebar =
  Ractive.extend({
    isolated: true,
    template: template,

    data: {
      flows: Rooms.flows(),
      privateConversations: Rooms.privateConversations(),

      currentRoom: 0
    }
  });

sidebar.on('showRoom', function () {
});

sidebar.on('leaveRoom', function () {
});

Rooms.on('flows_updated', function () {
  sidebar.set('flows', Rooms.flows());
});

Rooms.on('privateConversations_updated', function () {
  sidebar.set('privateConversations', Rooms.privateConversations());
});

export default sidebar;
