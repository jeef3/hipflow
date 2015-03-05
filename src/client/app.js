'use strict';

import React from 'react';

import Flowdock from './flowdock';
import {FlowdockAuth} from './flowdock';
import AppActions from './actions/AppActions';
import FlowdockActions from './actions/FlowdockActions';
import RoomStore from './stores/RoomStore.js';
import Main from './components/Main.react';

// Application root element
React.render(
  <Main />,
  document.getElementById('app'));

AppActions.init();

if (!FlowdockAuth.isAuthenticated()) {
  window.location.href = '/login';
}

var stream = Flowdock.stream(
  RoomStore.openFlows(), { user: 1, active: 'true' });

stream.onmessage(function (message) {
  console.log(message);
  FlowdockActions.receiveStreamMessage(message);
});
