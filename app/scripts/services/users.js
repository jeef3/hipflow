'use strict';

angular.module('hipflowApp')
  .service('Users', function Users(Flowdock, Rooms, localStorageService) {
    var users = localStorageService.get('users') || {};

    return {
      users: users,

      me: {},

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
        Flowdock.users.list(function (data) {
          users.splice(0);
          data.forEach(function (user) { users.push(user); });
        });
      }
    };
  });
