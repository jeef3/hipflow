'use strict';

import {EventEmitter} from 'events';

import objectAssign from 'object-assign';

import Dispatcher from '../dispatcher';
import Flowdock from '../flowdock';
import Storage from '../storage';

class User {
  constructor(data) {
    objectAssign(this, data);
  }

  isOnline() {
    var now = new Date();
    var ping = this.last_ping || this.last_activity;
    var diff = now - ping;

    // Consider online if active within the last 5 minutes
    return diff < (1000 * 60 * 5);
  }

  isMe() {
  }

  handleActivity(message) {
    if (!message.content) { return; }

    if (message.content.last_activity) {
      this.last_activity = message.content.last_activity;
    } else if (message.content.typing) {
      this.last_activity = message.sent;
      this.typing = true;
    } else if (message.content.typing === false) {
      this.typing = false;
    } else {
      this.last_ping = message.sent;
    }
  }
}

class UserStore extends EventEmitter {
  constructor() {
    this.me = Storage.create(User, 'me');
    this.all = Storage.create(User, 'users');

    this._dispatchTokenFn =
      Dispatcher.register(this._dispatchTokenFn.bind(this));
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

  getMe() {
    return this.me;
  }

  _update() {
    Flowdock.user((user) => {
      this.me = new User(user);

      Storage.set('me', this.me);
      this.emit('me_updated');
    });

    Flowdock.users.list((users) => {
      this.all = users.map(function (user) {
        return new User(user);
      });

      Storage.set('users', this.all);
      this.emit('users_updated');
    });
  }

  _dispatchTokenFn(action) {
    switch (action.type) {
      case 'app_init':
        this._update();
        break;

      case 'user_activity':
        var user = this.get(action.message.user);
        user.handleActivity(action.message);
        this.emit('users_updated');
        break;
    }
  }
}

export {User};
export default new UserStore();
