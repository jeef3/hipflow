'use strict';

import React from 'react';

import Dispatcher from './dispatcher';
import Flowdock from './flowdock';
import {FlowdockAuth} from './flowdock';
import RoomStore from './stores/RoomStore.js';
import Main from './components/Main.react';

// Application root element
React.render(
  <Main />,
  document.getElementById('app'));

Dispatcher.dispatch({ type: 'app_init' });

if (!FlowdockAuth.isAuthenticated()) {
  window.location.href = '/login';
}

var stream = Flowdock.stream(
  RoomStore.openFlows(), { user: 1, active: 'true' });

stream.onmessage(function (message) {
  console.log(message);
  Dispatcher.dispatch({
    type: 'stream',
    message: message
  });
});
