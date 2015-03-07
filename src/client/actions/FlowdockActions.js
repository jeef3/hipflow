'use strict';

import Dispatcher from '../dispatcher';

export default {
  connected: function () {
    Dispatcher.dispatch({ type: 'stream_connected' });
  },

  disconnected: function () {
    Dispatcher.dispatch({ type: 'stream_disconnected' });
  },

  receiveStreamMessage: function (message) {
    Dispatcher.dispatch({
      type: 'stream',
      message: message
    });
  }
};
