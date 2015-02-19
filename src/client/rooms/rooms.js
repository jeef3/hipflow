'use strict';

import {EventEmitter} from 'events';
import util from 'util';

import Room from './room';
import Flowdock from '../flowdock';
import storage from '../storage';

var Rooms = {
  flows: storage.create(Room, 'flows'),
  privateConversations: storage.create(Room, 'privateConversations'),

  get: function (id) {
    var flow = this.flows.filter(function (f) {
      return f.id === id;
    })[0];

    if (flow) {
      return flow;
    }

    id = parseInt(id, 10);
    var privateConversation = this.privateConversations.filter(function (f) {
      return f.id === id;
    })[0];

    if (privateConversation) {
      return privateConversation;
    }

    throw new Error('Invalid flow or privateConversation id: ' + id);
  },

  openFlows: function () {
    return this.flows.filter(function (flow) {
      return flow.open;
    });
  },

  update: function () {
    Flowdock.flows.allWithUsers(function (flows) {
      this.flows = flows.map(function (flow) {
        return Object.create(Room, flow);
      });

      storage.set('flows', this.flows);
      Rooms.emit('flows_updated', this.flows);
    });

    Flowdock.privateConversations.list(function (privateConversations) {
      this.privateConversations = privateConversations.map(function (flow) {
        return Object.create(Room, flow);
      });

      storage.set('privateConversations', this.privateConversations);
      Rooms.emit('privateConversations_updated', this.privateConversations);
    });
  }
};

util.inherits(Rooms, EventEmitter);

Flowdock.on('message', function () {

});

Flowdock.on('user_activity', function () {

});


export default Rooms;
