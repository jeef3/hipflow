'use strict';

import Dispatcher from '../dispatcher';

export default {
  init: function () {
    Dispatcher.dispatch({
      type: 'app_init'
    });
  }
};
