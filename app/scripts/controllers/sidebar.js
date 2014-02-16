'use strict';

angular.module('hipFlowApp')
  .controller('SidebarCtrl', function ($scope, Flowdock) {
    $scope.$on('NEW_MESSAGE', function (e, message) {
      var messageRoomId;

      if (message.flow) {
        messageRoomId = message.flow;
      } else if (message.to) {
        messageRoomId = message.to === Flowdock.me().id ?
          message.user :
          message.to;
      }

      if (messageRoomId !== $scope.currentRoom.id) {
        var room = Flowdock.getRoomById(messageRoomId);
        room.unread = room.unread + 1 || 1;
      }
    });
  });
