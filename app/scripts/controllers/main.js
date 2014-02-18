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

    $scope.mentionsMe = function (message) {
      if (!message.mentions || !message.mentions.length) {
        return false;
      }

      var me = message.mentions.filter(function (mention) {
        return mention === Flowdock.me().id;
      });

      return me.length > 0;
    };

    $scope.isDiscussionHead = function (message) {
      return !!message.lastUpdate;
    };

    $scope.tokenExpired = false;
    $scope.authError = false;

    $scope.$on('TOKEN_EXPIRED', function () {
      $scope.tokenExpired = true;
    });

    $scope.refreshToken = function () {
      FlowdockAuth.refreshTokens()
        .then(function () {
          $scope.tokenExpired = false;
          $scope.authError = false;
        }, function () {
          $scope.authError = true;
        });
    };
  });
