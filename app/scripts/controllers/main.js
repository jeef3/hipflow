'use strict';

angular.module('hipflowApp')
  .controller('MainCtrl', function ($scope, $rootScope, FlowdockAuth, Users, Rooms, Messages, localStorageService) {

    $scope.flows = Rooms.flows;
    $scope.privateConversations = Rooms.privateConversations;

    var currentRoomId = localStorageService.get('currentRoomId') || null;
    $scope.currentRoom = currentRoomId ?
      Rooms.get(currentRoomId) :
      null;

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      $scope.setCurrentDiscussion();
      room.unread = 0;
      localStorageService.set('currentRoomId', room.id);

      Messages.update(room);
    };

    $scope.leaveRoom = function (room) {
      Rooms.close(room);
    };

    $scope.me = function () {
      return Users.me;
    };

    $scope.user = function (userId) {
      return Users.get(userId);
    };

    $scope.send = function (message) {
      if ($scope.currentDiscussion.id) {
        Messages.send($scope.currentRoom, message, [],
          $scope.currentDiscussion.id);
      } else {
        Messages.send($scope.currentRoom, message, []);
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

    $scope.getFileUrl = function (/*path*/) {
      // return Flowdock.url(path);
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
            // id: Flowdock.getCommentTitleMessageId(message),
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
