'use strict';

angular.module('hipflowApp')
  .controller('SidebarCtrl', function ($scope, Flowdock, Users, Rooms) {
    $scope.flows = Rooms.flows;
    $scope.privateConversations = Rooms.privateConversations;

    $scope.$on('NEW_MESSAGE', function (e, message) {
      var messageRoomId;

      if (message.user === Users.me.id) {
        return;
      }

      if (message.flow) {
        messageRoomId = message.flow;
      } else if (message.to) {
        messageRoomId = message.to === Users.me.id ?
          message.user :
          message.to;

        messageRoomId = parseInt(messageRoomId, 10);
      }

      if (messageRoomId !== $scope.currentRoom.id) {
        var room = Rooms.get(messageRoomId);
        room.unread = room.unread + 1 || 1;
      }
    });
  });
