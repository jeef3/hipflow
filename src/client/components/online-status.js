'use strict';

import Ractive from 'ractive';

import Users from '../users';
import template from './online-status.html';

var onlineStatus =
  Ractive.components['x-online-status'] =
  Ractive.extend({
    isolated: true,
    template: template,

    data: {
      online: navigator.onLine,
      me: Users.me
    },

    onrender: function () {
      window.addEventListener('online', () => {
        this.set('online', true);
      });

      window.addEventListener('offline', () => {
        this.set('online', false);
      });

      Users.on('user_updated', (e, user) => {
        if (!user.isMe()) { return; }
        this.set('me', user);
      });
    }
  });


export default onlineStatus;
