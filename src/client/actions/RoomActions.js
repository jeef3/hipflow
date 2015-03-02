'use strict';

import Dispatcher from '../dispatcher';

export default {
  showRoom: function (room) {
    Dispatcher.dispatch({
      type: 'show_room',
      id: room.id
    });
  },

  closeRoom: function (room) {
    Dispatcher.dispatch({
      type: 'close_room',
      id: room.id
    });
  }
};
