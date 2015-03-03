'use strict';

import {EventEmitter} from 'events';

import objectAssign from 'object-assign';

import Dispatcher from '../dispatcher';
import Flowdock from '../flowdock';
import Storage from '../storage';
import {User} from  './UserStore';

class Room {
  constructor(data) {
    objectAssign(this, data);

    if (data && data.users) {
      this.users = data.users.map((user) => {
        return new User(user);
      });
    }
  }

  hasUnread() {
    return false;
  }

  getUser(id) {
    return this.users.filter((user) => {
      return user.id === id;
    })[0];
  }

  getJoinedUsers() {
    return this.users.filter((user) => {
      return user.in_flow;
    });
  }

}

class RoomStore extends EventEmitter {
  constructor() {
    this.flows = Storage.create(Room, 'flows');
    this.privateConversations = Storage.create(Room, 'privateConversations');

    this._dispatchTokenFn =
      Dispatcher.register(this._dispatchTokenFn.bind(this));
  }

  get(id) {
    var flow = this.flows.filter((f) => {
      return f.id === id;
    })[0];

    if (flow) {
      return flow;
    }

    id = parseInt(id, 10);
    var privateConversation = this.privateConversations.filter((f) => {
      return f.id === id;
    })[0];

    if (privateConversation) {
      return privateConversation;
    }

    throw new Error('Invalid flow or privateConversation id: ' + id);
  }

  openFlows() {
    return this.flows.filter((flow) => {
      return flow.open;
    });
  }

  openPrivateConversations() {
    return this.privateConversations.filter((privateConversation) => {
      return privateConversation.open;
    });
  }

  _update() {
    Flowdock.flows.allWithUsers((flows) => {
      this.flows = flows.map((flow) => {
        return new Room(flow);
      });

      Storage.set('flows', this.flows);
      this.emit('flows_updated');
    });

    Flowdock.privateConversations.list((privateConversations) => {
      this.privateConversations = privateConversations.map((privateConversation) => {
        return new Room(privateConversation);
      });

      Storage.set('privateConversations', this.privateConversations);
      this.emit('private_conversations_updated');
    });
  }

  _dispatchTokenFn(action) {
    switch (action.type) {
      case 'app_init':
        this._update();
        break;

      case 'user_activity':
        var room = this.get(action.message.flow);
        var user = room.getUser(action.message.user);
        user.handleActivity(action.message);
        this.emit('users_updated');
        break;
    }
  }
}

export {Room};
export default new RoomStore();
