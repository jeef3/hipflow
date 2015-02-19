'use strict';

import Ractive from 'ractive';

import Users from '../users';
import template from './online-status.html';

var onlineStatus =
  Ractive.components.xOnlineStatus =
  Ractive.extend({
    isolated: true,
    template: template,

    data: {
      online: navigator.onLine,
      me: Users.me
    }
  });

Users.on('user_updated', function (e, user) {
  if (!user.isMe()) { return; }
  onlineStatus.set('me', user);
});

window.addEventListener('online', function () {
  onlineStatus.set('online', true);
});

window.addEventListener('offline', function () {
  onlineStatus.set('online', false);
});

export default onlineStatus;
