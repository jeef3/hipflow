'use strict';

angular.module('slipflowApp')
  .controller('SidebarCtrl', function ($scope, Flowdock, Users, Rooms) {
    $scope.flows = Rooms.flows;
    $scope.privateConversations = Rooms.privateConversations;

    $scope.$on('MESSAGE_ADDED', function (e, message) {
      if (message.user === Users.me.id) {
        return;
      }

      var room = Rooms.getForMessage(message);

      if (!room) {
        // Not sure how we got here?
        return;
      }

      // If the room is not currently open, then open it
      if (!room.open) {
        Rooms.open(room);
      }

      if (room.id !== $scope.currentRoom.id) {
        room.hasUnread = true;
      }
    });
  });
