'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, localStorageService) {
    $scope.apiToken = localStorageService.get('apiToken') || '';
    $scope.streamToken = localStorageService.get('streamToken') || '';

    var connect = function () {
      Flowdock.connect({
        api: $scope.apiToken,
        stream: $scope.streamToken
      });

      $scope.authenticated = true;

      $scope.flowdock = Flowdock.data;

      var currentRoomId = localStorageService.get('currentRoom') || null;
      $scope.currentRoom = currentRoomId ?
        Flowdock.getRoomById(currentRoomId) :
        null;
    };

    if ($scope.apiToken && $scope.streamToken) {
      connect();
    }

    $scope.login = function () {
      localStorageService.set('apiToken', this.apiToken);
      localStorageService.set('streamToken', this.streamToken);

      connect();
    };

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      localStorageService.add('currentRoom', room.id);

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
