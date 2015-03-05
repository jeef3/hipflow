'use strict';

import {EventEmitter} from 'events';

import Dispatcher from '../dispatcher';
import Storage from '../storage';
import RoomStore from './RoomStore';

class MessageWindowStore extends EventEmitter {
  constructor() {
    var current = Storage.get('currentRoom');
    this.currentRoomId = current ? current.value : null;

    this._dispatchTokenFn =
      Dispatcher.register(this._dispatchTokenFn.bind(this));
  }

  getCurrentRoom() {
    return RoomStore.get(this.currentRoomId);
  }

  _dispatchTokenFn(action) {
    switch (action.type) {
      case 'show_room':
        this.currentRoomId = action.id;
        Storage.set('currentRoom', { value: action.id });
        this.emit('change');
        break;
    }
  }
}

export default new MessageWindowStore();
