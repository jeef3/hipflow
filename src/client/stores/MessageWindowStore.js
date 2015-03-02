'use strict';

import {EventEmitter} from 'events';

import Dispatcher from '../dispatcher';
import Storage from '../storage';

class MessageWindowStore extends EventEmitter {
  constructor() {
    var current = Storage.get('currentRoom');
    this.currentRoom = current ? current.value : null;

    this._dispatchTokenFn =
      Dispatcher.register(this._dispatchTokenFn.bind(this));
  }

  getCurrentRoomId() {
    return this.currentRoom;
  }

  _dispatchTokenFn(action) {
    switch (action.type) {
      case 'show_room':
        this.currentRoom = action.id;
        Storage.set('currentRoom', { value: action.id });
        this.emit('change');
        break;
    }
  }
}

export default new MessageWindowStore();
