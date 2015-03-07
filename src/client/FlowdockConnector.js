'use strict';

import FlowdockActions from './actions/FlowdockActions';
import RoomStore from './stores/RoomStore';
import Flowdock, {FlowdockAuth} from './flowdock';

var connection = null;

function onMessage(message) {
  console.log(message);
  FlowdockActions.receiveStreamMessage(message);
}

function connect() {
  connection = Flowdock.stream(
    RoomStore.openFlows(),
    { user: 1, active: 'true' });

  connection.onmessage(onMessage);

  console.log('connected');
  FlowdockActions.connected();
}

function disconnect() {
  connection.close();

  console.log('disconnected');
  FlowdockActions.disconnected();
}

function reconnect() {
  console.log('reconnecting');
  disconnect();
  connect();
}

export default {
  start: function () {
    if (!FlowdockAuth.isAuthenticated()) {
      window.location.href = '/login';
    }

    RoomStore.on('flows_list_updated', reconnect);

    connect();
  }
};
