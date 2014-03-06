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

      heartbeat: function (/*heartbeat*/) {
        return;
        // Update the user
        // users[heartbeat.user].last_activity = heartbeat.content.last_activity;

        // Update the users prescence in the room
        // var room = heartbeat.flow ?
        //   Rooms.flows[heartbeat.flow] :
        //   Rooms.privateMessages[heartbeat.user];

        // if (!room) {
        //   return;
        // }

        // var user = room.users.filter(function (u) {
        //   return u.id === parseInt(heartbeat.user);
        // })[0];

        // if (user) {
        //   if (heartbeat.content.last_activity) {
        //     user.last_ping = heartbeat.content.last_activity;
        //   } else {
        //     user.last_ping = heartbeat.sent;

        //     if (Object.keys(heartbeat.content).length) {
        //       console.log('Unknown user.activity', heartbeat.content);
        //     }
        //   }
        // }
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
