'use strict';

import Dispatcher from '../dispatcher';

export default {
  receiveStreamMessage: function (message) {
    Dispatcher.dispatch({
      type: 'stream',
      message: message
    });
  }
};
