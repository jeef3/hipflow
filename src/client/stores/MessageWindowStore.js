'use strict';

import {EventEmitter} from 'events';

import Dispatcher from '../dispatcher';
import Storage from '../storage';
import RoomStore from './RoomStore';

class MessageWindowStore extends EventEmitter {
  constructor() {
    var current = Storage.get('currentRoom');

    if (current && current.value) {
      this.currentRoom = RoomStore.get(current.value);
    }

    this.dispatchToken =
      Dispatcher.register(this._dispatchTokenFn.bind(this));
  }

  getCurrentRoom() {
    return this.currentRoom;
  }

  _dispatchTokenFn(action) {
    Dispatcher.waitFor([RoomStore.dispatchToken]);

    switch (action.type) {
      case 'show_room':
        this.currentRoom = RoomStore.get(action.id);
        Storage.set('currentRoom', { value: action.id });
        this.emit('change');
        break;
    }
  }
}

export default new MessageWindowStore();
