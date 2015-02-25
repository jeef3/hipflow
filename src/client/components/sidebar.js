'use strict';

import Ractive from 'ractive';

import Rooms from '../rooms';
import template from './sidebar.html';

export default
  Ractive.components['x-sidebar'] =
  Ractive.extend({
    template,
    isolated: true,

    data: {
      flows: Rooms.flows,
      privateConversations: Rooms.privateConversations,

      currentRoom: 0
    },

    onrender: function () {
      // sidebar.on('showRoom', function () {
      // });

      // sidebar.on('leaveRoom', function () {
      // });

      Rooms.on('flows_updated', () => {
        console.log('flows updated');
        this.set('flows', Rooms.flows());
      });

      Rooms.on('privateConversations_updated', () => {
        console.log('privates updated');
        this.set('privateConversations', Rooms.privateConversations());
      });
    }
  });
