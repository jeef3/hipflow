'use strict';

import {EventEmitter} from 'events';

import RoomStore from './stores/RoomStore';
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
      this.emit('hide_room', RoomStore.get(this.activeRoomId));
    }

    storage.set('currentRoom', room);

    this.activeRoomId = room.id;
    this.emit('show_room', RoomStore.get(this.activeRoomId));
  }

  getActive() {
    if (!this.activeRoomId) {
      return null;
    }

    return RoomStore.get(this.activeRoomId);
  }
}

export default new MessageWindowManager();
