'use strict';

import {EventEmitter} from 'events';

import objectAssign from 'object-assign';

import Dispatcher from '../dispatcher';
import Flowdock from '../flowdock';
import Storage from '../storage';

class Room {
  constructor(data) {
    objectAssign(this, data);
  }

  hasUnread() {
    return false;
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
      this.flows = flows.map(function (flow) {
        return new Room(flow);
      });

      Storage.set('flows', this.flows);
      this.emit('flows_updated');
    });

    Flowdock.privateConversations.list((privateConversations) => {
      this.privateConversations = privateConversations.map(function (privateConversation) {
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
    }
  }
}

var roomStore = new RoomStore();

export {Room};
export default new RoomStore();
