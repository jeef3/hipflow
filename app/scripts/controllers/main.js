'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, localStorageService) {
    // Flowdock.connect('');
    $scope.flowdock = Flowdock.data;

    var currentRoomId = localStorageService.get('currentRoom') || null;
    $scope.currentRoom = currentRoomId ?
      Flowdock.getRoom(currentRoomId) :
      null;

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      localStorageService.add('currentRoom', room.id);
    };

    $scope.leaveRoom = function (room) {
      // TODO: Leave room
    };
  });
