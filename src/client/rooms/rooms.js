'use strict';

import {EventEmitter} from 'events';

import Room from './room';
import Flowdock from '../flowdock';
import storage from '../storage';

class Rooms extends EventEmitter {

  constructor() {
    this.flows = storage.create(Room, 'flows');
    this.privateConversations = storage.create(Room, 'privateConversations');
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

  update() {
    Flowdock.flows.allWithUsers((flows) => {
      this.flows = flows.map(function (flow) {
        return new Room(flow);
      });

      storage.set('flows', this.flows);
      this.emit('flows_updated', this.flows);
    });

    Flowdock.privateConversations.list((privateConversations) => {
      this.privateConversations = privateConversations.map(function (privateConversation) {
        return new Room(privateConversation);
      });

      storage.set('privateConversations', this.privateConversations);
      this.emit('privateConversations_updated', this.privateConversations);
    });
  }
}

export default new Rooms();

Flowdock.on('message', () => {

});

Flowdock.on('user_activity', () => {

});
