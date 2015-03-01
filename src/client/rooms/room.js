'use strict';

import _ from 'lodash';

class Room {
  constructor(data) {
    _.assign(this, data);
  }

  hasUnread() {
    return false;
  }
}

export default Room;
