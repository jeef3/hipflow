'use strict';

import {EventEmitter} from 'events';

class MessageWindowManager extends EventEmitter {

  constructor() {
    this.active = null;
  }

  setActive(room) {
    if (this.active) {
      this.emit('hide_room', this.active);
    }

    this.active = room;
    this.emit('show_room', this.active);
  }
}

export default new MessageWindowManager();
