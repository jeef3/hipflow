'use strict';

import {EventEmitter} from 'events';
import util from 'util';

import User from './user';
import Flowdock from '../flowdock';
import storage from '../storage';

var Users = {
  me: storage.create(User.prototype, 'me'),
  all: storage.create(User.prototype, 'users'),

  get: function (userId) {
    var id = parseInt(userId, 10);

    if (!id) {
      throw new Error('Invalid user id: ' + userId);
    }

    return this.all.filter(function (user) {
      return user.id === id;
    })[0];
  },

  update: function () {
    Flowdock.user(function (user) {
      this.me = Object.create(User, user);

      storage.set('me', this.me);
      Users.emit('user_updated', this.me);
    }.bind(this));

    Flowdock.users.list(function (users) {
      this.users = users.map(function (user) {
        return Object.create(User, user);
      });

      storage.set('users', this.users);
      Users.emit('users_updated', this.users);
    }.bind(this));
  }
};

util.inherits(Users, EventEmitter);

Flowdock.on('user_activity', function (e, message) {
  var user = Users.get(message.user);

  if (message.content.last_activity) {
    user.last_activity = message.content.last_activity;
  } else if (message.content.typing) {
    user.last_activity = message.sent;
    user.typing = true;
  } else if (message.content.typing === false) {
    user.typing = false;
  } else {
    user.last_ping = message.sent;
  }

  Users.emit('user_updated', user);
});

export default Users;
