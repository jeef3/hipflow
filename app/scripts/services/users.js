'use strict';

angular.module('hipflowApp')
  .service('Users', function Users(Flowdock, localStorageService) {
    return {
      users: localStorageService.get('users') || [],

      me: localStorageService.get('me') || {},

      addOrUpdate: function (user) {
        var existing = this.get(user.id);

        if (existing) {
          angular.copy(user, existing);
          return;
        }

        this.users.push(user);
      },

      get: function (userId) {
        return this.users.filter(function (user) {
          return user.id === parseInt(userId, 10);
        })[0];
      },

      userActivity: function (message) {
        var user = this.get(message.user);

        if (message.content.last_activity) {
          user.last_activity = message.content.last_activity;
        } else if (message.content.typing) {
          user.last_activity = message.sent;
          user.typing = true;
        } else {
          user.last_ping = message.sent;
        }
      },

      isOnline: function (userId) {
        var user = this.get(userId);

        var now = new Date(),
        ping = user.last_ping || user.last_activity,
        diff = now - ping;

        if (diff < (1000 * 60 * 5)) {
          return true;
        } else {
          return false;
        }
      },

      update: function () {
        var _this = this;

        Flowdock.user(function (user) {
          angular.copy(user, _this.me);

          localStorageService.set('me', _this.me);
        });

        Flowdock.users.list(function (data) {
          data.forEach(_this.addOrUpdate.bind(_this));

          localStorageService.set('users', _this.users);
        });
      }
    };
  });
