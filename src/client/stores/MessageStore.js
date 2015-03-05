'use strict';

import {EventEmitter} from 'events';

import objectAssign from 'object-assign';

import Dispatcher from '../dispatcher';
import Flowdock from '../flowdock';
import UserStore from './UserStore';

class Message {
  constructor(data) {
    objectAssign(this, data);

    if (data.user) {
      this.user = UserStore.get(data.user);
    }
  }
}

class MessageStore extends EventEmitter {
  constructor() {
    this.messages = {};

    this._dispatchTokenFn =
      Dispatcher.register(this._dispatchTokenFn.bind(this));
  }

  get(messageId, roomId) {
    var roomChatLogs = this.messages[roomId];

    if (!roomChatLogs) {
      return null;
    }

    return roomChatLogs.filter(function (m) {
      return m.id === parseInt(messageId) || m.uuid === messageId;
    })[0];
  }

  getMessageForRoom(id) {
    var roomChatLogs = this.messages[roomId];

    if (!roomChatLogs) {
      roomChatLogs = this.messages[roomId] = [];
    }

    return roomChatLogs;
  }

  _update(room, options) {
    var r = room.access_mode ?
      Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
      Flowdock.privateConversations(room.id);

    r.messages.list(options, (messages) => {
      this.messages[room.id] = messages.map((message) => {
        return new Message(message);
      });

      this.emit('messages_updated');
    });
  }

  _dispatchTokenFn(action) {
    switch (action.type) {
      case 'send_message':
      case 'edit_message':
      case 'delete_message':
        break;
    }
  }
}

export {Message}
export default new MessageStore();
