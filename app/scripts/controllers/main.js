'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, localStorageService) {
    // Flowdock.connect('');
    $scope.flowdock = Flowdock.data;

    var currentRoomId = localStorageService.get('currentRoom') || null;
    $scope.currentRoom = currentRoomId ?
      Flowdock.getRoomById(currentRoomId) :
      null;

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      localStorageService.add('currentRoom', room.id);
    };

    $scope.leaveRoom = function (room) {
      // TODO: Leave room
    };

    $scope.user = function (userId) {
      return Flowdock.getUserById(userId);
    };

    $scope.isOnline = function (user) {
      var now = new Date(),
        ping = user.last_ping,
        diff = now - ping;

      if (diff < 300000) {
        return true;
      } else {
        return false;
      }
    };
  });
