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
      $scope.setCurrentDiscussion();
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
      if ($scope.currentDiscussion.id) {
        Flowdock.sendMessageToRoom(message,
          $scope.currentRoom,
          $scope.currentDiscussion.id);
      } else {
        Flowdock.sendMessageToRoom(message, $scope.currentRoom);
      }

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

      FlowdockAuth.refreshToken()
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

    $scope.currentDiscussion = {};
    $scope.setCurrentDiscussion = function (message) {
      // No discussion in 1-on-1
      if (!$scope.currentRoom.access_mode) {
        return;
      }

      if (!message) {
        angular.copy({
          id: null,
          title: null
        }, $scope.currentDiscussion);
        return;
      }

      switch (message.event) {
        case 'comment':
          angular.copy({
            id: Flowdock.getCommentTitleMessageId(message),
            title: message.content.title
          }, $scope.currentDiscussion);
          break;

        case 'file':
          break;

        case 'message':
          angular.copy({
            id: message.id,
            title: message.content
          }, $scope.currentDiscussion);
          break;

        default:
          throw new Error('Don\'t know how to reply to ' + message.event);
      }

      $rootScope.$broadcast('CURRENT_DISCUSSION_SET');
    };
  });
