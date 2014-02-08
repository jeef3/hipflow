'use strict';

angular.module('hipFlowApp')
  .controller('MessagesCtrl', function ($scope, $location, Flowdock, localStorageService) {
    $scope.logs = localStorageService.get('chatLogs') || {};

    $scope.rooms = [
      'private/123',
      'skilitics/thrive'
    ];
    $scope.currentRoom = 'private/123';


    var showRoom = function (room) {
      $scope.currentRoom = room;

      if (room.search(/^private/)) {
        var privateChatId = room.match(/^private\/(.*)/)[1];
        Flowdock.getPrivateMessages(privateChatId).then(loadMessages);
      } else {
        Flowdock.getMessages(room).then(loadMessages);
      }
    };

    var leaveRoom = function (room) {
      // TODO: Leave room
    };

    $scope.$on('SHOW_ROOM', function (e, room) {
      showRoom(room);
    });

    $scope.$on('LEAVE_ROOM', function (e, room) {
      leaveRoom(room);
    });
  });
