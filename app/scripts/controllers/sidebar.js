'use strict';

angular.module('hipflowApp')
  .controller('SidebarCtrl', function ($scope, Flowdock, Rooms) {
    $scope.$on('NEW_MESSAGE', function (e, message) {
      var messageRoomId;

      if (message.user === Flowdock.me().id) {
        return;
      }

      if (message.flow) {
        messageRoomId = message.flow;
      } else if (message.to) {
        messageRoomId = message.to === Flowdock.me().id ?
          message.user :
          message.to;

        messageRoomId = parseInt(messageRoomId, 10);
      }

      if (messageRoomId !== $scope.currentRoom.id) {
        var room = Flowdock.getRoomById(messageRoomId);
        room.unread = room.unread + 1 || 1;
      }
    });
  });
