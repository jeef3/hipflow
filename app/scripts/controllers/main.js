'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, localStorageService) {

    var connect = function () {
      Flowdock.connect({
        email: $scope.email,
        password: $scope.password
      });

      $scope.authenticated = true;

      $scope.flowdock = Flowdock.data;

      var currentRoomId = localStorageService.get('currentRoomId') || null;
      $scope.currentRoom = currentRoomId ?
        Flowdock.getRoomById(currentRoomId) :
        null;
    };

    $scope.login = function () {
      connect();
    };

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      localStorageService.add('currentRoomId', room.id);

      Flowdock.getMessagesForRoom(room);
    };

    $scope.leaveRoom = function (room) {
      // TODO: Leave room
    };

    $scope.user = function (userId) {
      return Flowdock.getUserById(userId);
    };

    $scope.send = function (message) {
      Flowdock.sendMessageToRoom(message, $scope.currentRoom);
      // $scope.sendMessageForm.$setPristine();
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
