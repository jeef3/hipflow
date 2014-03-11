'use strict';

angular.module('hipflowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, FlowdockAuth, Users, Rooms, Messages, localStorageService) {

    $scope.me = Users.me;

    $scope.flows = Rooms.flows;
    $scope.privateConversations = Rooms.privateConversations;

    var currentRoomId = localStorageService.get('currentRoomId') || null;
    if (currentRoomId) {
      $scope.currentRoom = Rooms.get(currentRoomId);
      Messages.update($scope.currentRoom);
    } else {
      $scope.currentRoom = null;
    }

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
      $scope.setCurrentDiscussion();

      localStorageService.set('currentRoomId', room ? room.id : null);

      if (room) {
        Rooms.clearMentions(room);
        Messages.update(room);
      }
    };

    $scope.leaveRoom = function (room) {
      if (room === $scope.currentRoom) {
        $scope.showRoom(null);
      }

      Rooms.close(room);
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

      if (diff < (1000 * 60 * 5)) {
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

    $scope.getFileUrl = function (path) {
      return Flowdock.util.url(path);
    };

    $scope.currentDiscussion = {};
    $scope.setCurrentDiscussion = function (message) {
      // No discussion in 1-on-1
      if (!$scope.currentRoom || !$scope.currentRoom.access_mode) {
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
            id: message.parent,
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
