'use strict';

import {EventEmitter} from 'events';

import objectAssign from 'object-assign';

import Dispatcher from '../dispatcher';
import Flowdock from '../flowdock';
import UserStore from './UserStore';
import MessageWindowStore from './MessageWindowStore';

class Message {
  constructor(data) {
    objectAssign(this, data);

    if (data.user) {
      this.user = UserStore.get(data.user);
    }
  }

  isMonologue(previous) {
    if (this.user === '0') {
      return previous && this.event === previous.event;
    } else {
      return previous &&
        this.user === previous.user &&
        this.app === previous.app;
    }
  }

  isSameDay(previous) {
    if (!previous) {
      return true;
    }

    return new Date(this.sent).getDate() === new Date(previous.sent).getDate();
  }

  isFirstUnseen(room, message) {
    return false;
  }

  hasTags(tags) {
    return false;
  }

  getMetadata() {
    if (this.event === 'message' ||
        this.event === 'comment' ||
        this.event === 'file') {
      return {
        author: this.user.name,
        avatar: this.user.avatar + '60'
      };
    }

    switch (this.event) {
      case 'jira':
        return {
          author: 'JIRA',
          avatar: '/images/jira/avatar.png'
        };
      case 'vcs':
        return {
          author: 'GitHub',
          avatar: '/images/github/avatar.png'
        };
      case 'trello':
        return {
          author: 'Trello',
          avatar: '/images/trello/avatar.png'
        };
    }
  }
}

class MessageStore extends EventEmitter {
  constructor() {
    this.messages = {};

    this.dispatchToken =
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

  getMessagesForRoom(id) {
    var roomChatLogs = this.messages[id];

    if (!roomChatLogs) {
      roomChatLogs = this.messages[id] = [];
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

      console.log('emit');

      this.emit('messages_updated');
    });
  }

  _dispatchTokenFn(action) {
    Dispatcher.waitFor([MessageWindowStore.dispatchToken]);

    switch (action.type) {
      case 'app_init':
      case 'show_room':
        this._update(MessageWindowStore.getCurrentRoom());
        break;

      case 'send_message':
      case 'edit_message':
      case 'delete_message':
        break;
    }
  }
}

export {Message}
export default new MessageStore();
