'use strict';

import Ractive from 'ractive';

import Users from '../../users';
import template from './online-status.html';

export default
  Ractive.components['x-online-status'] =
  Ractive.extend({
    template,
    isolated: true,

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
