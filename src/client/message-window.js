'use strict';

import {EventEmitter} from 'events';

import Rooms from './rooms';
import storage from './storage';

class MessageWindowManager extends EventEmitter {

  constructor() {
    var currentRoom = storage.get('currentRoom');
    if (currentRoom) {
      this.activeRoomId = currentRoom.id;
    }
  }

  setActive(room) {
    if (this.activeRoomId) {
      this.emit('hide_room', Rooms.get(this.activeRoomId));
    }

    storage.set('currentRoom', room);

    this.activeRoomId = room.id;
    console.log('active', this.activeRoomId);
    this.emit('show_room', Rooms.get(this.activeRoomId));
  }

  getActive() {
    if (!this.activeRoomId) {
      return null;
    }

    return Rooms.get(this.activeRoomId);
  }
}

export default new MessageWindowManager();
