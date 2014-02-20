'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, FlowdockAuth, localStorageService) {
    Flowdock.connect();

    $scope.flowdock = Flowdock.data;

    var currentRoomId = localStorageService.get('currentRoomId') || null;
    $scope.currentRoom = currentRoomId ?
      Flowdock.getRoomById(currentRoomId) :
      null;

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      room.unread = 0;
      localStorageService.add('currentRoomId', room.id);

      Flowdock.getMessagesForRoom(room);
    };

    $scope.leaveRoom = function (room) {
      Flowdock.leaveRoom(room);
    };

    $scope.user = function (userId) {
      return Flowdock.getUserById(userId);
    };

    $scope.send = function (message) {
      Flowdock.sendMessageToRoom(message, $scope.currentRoom);
      this.message = null;
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

    $scope.tokenExpired = false;
    $scope.authError = false;

    $scope.$on('TOKEN_EXPIRED', function () {
      $scope.tokenExpired = true;
    });

    $scope.refreshToken = function () {
      $scope.refreshStatus = ' refreshing';

      FlowdockAuth.refreshTokens()
        .then(function () {
          $scope.refreshStatus = '';
          $scope.tokenExpired = false;
          $scope.authError = false;
        }, function () {
          $scope.refreshStatus = ' error';
          $scope.authError = true;
        });
    };

    $scope.hasJiraType = function () {

    };

    $scope.getFileUrl = function (path) {
      return Flowdock.url(path);
    };
  });
