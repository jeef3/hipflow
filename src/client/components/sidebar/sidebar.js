'use strict';

import Ractive from 'ractive';

import Rooms from '../../rooms';
import MessageWindowManager from '../../message-window';
import template from './sidebar.html';

export default
  Ractive.components['x-sidebar'] =
  Ractive.extend({
    template,
    isolated: true,

    data: {
      flows: Rooms.openFlows(),
      privateConversations: Rooms.openPrivateConversations(),

      currentRoom: {},

      isActive: function (room) {
        return room === this.get('currentRoom');
      },

      hasUnread: function (room) {
        return room.hasUnread();
      }
    },

    onrender: function () {
      Rooms.on('flows_updated', () => {
        this.set('flows', Rooms.openFlows());
      });

      Rooms.on('privateConversations_updated', () => {
        this.set('privateConversations', Rooms.openPrivateConversations());
      });

      MessageWindowManager.on('show_room', (room) => {
        this.set('currentRoom', room);
      });
    },

    showRoom: function (room) {
      MessageWindowManager.setActive(room);
    },

    leaveRoom: function (room) {
      console.log(room);
      // RoomManager.leaveRoom(room);
    }
  });
