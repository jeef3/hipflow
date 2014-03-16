'use strict';

angular.module('hipflowApp')
  .controller('SidebarCtrl', function ($scope, Flowdock, Users, Rooms) {
    $scope.flows = Rooms.flows;
    $scope.privateConversations = Rooms.privateConversations;

    $scope.$on('NEW_MESSAGE', function (e, message) {
      if (message.user === Users.me.id) {
        return;
      }

      var room = Rooms.getForMessage(message);

      if (room.id !== $scope.currentRoom.id) {
        room.unread = room.unread + 1 || 1;
      }
    });

    $scope.$watch('currentRoom', function (room) {
      Rooms.clearMentions(room);
    });
  });
