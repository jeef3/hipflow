'use strict';

import {EventEmitter} from 'events';

import User from './user';
import Flowdock from '../flowdock';
import storage from '../storage';

class Users extends EventEmitter {

  constructor() {
    this.me = storage.create(User.prototype, 'me');
    this.all = storage.create(User.prototype, 'users');
  }

  get(id) {
    var userId = parseInt(id, 10);

    if (!userId) {
      throw new Error('Invalid user id: ' + id);
    }

    return this.all.filter(function (user) {
      return user.id === userId;
    })[0];
  }

  update() {
    Flowdock.user((user) => {
      this.me = new User(user);

      storage.set('me', this.me);
      this.emit('user_updated', this.me);
    });

    Flowdock.users.list((users) => {
      this.all = users.map(function (user) {
        return new User(user);
      });

      storage.set('users', this.all);
      this.emit('users_updated', this.all);
    });
  }
}

export default new Users();

Flowdock.on('user_activity', (e, message) => {
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
