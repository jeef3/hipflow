'use strict';

import Ractive from 'ractive';

import MessageWindowManager from '../../message-window';
// import Threads from '../../threads';
// import Sources from '../../sources';
import template from './chat-context.html';

export default
  Ractive.components['x-chat-context'] =
  Ractive.extend({
    template,
    isolated: true,

    data: {
      threads: [],
      sources: []
    },

    onrender: function () {

      MessageWindowManager.on('show_room', (room) => {
        // TODO: Refresh sources list for this room
        this.set('currentRoom', room);
      });
    }
  });
