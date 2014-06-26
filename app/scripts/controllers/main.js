'use strict';

angular.module('slipflowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, FlowdockAuth, Users, Rooms, Messages, Sources, localStorageService) {

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
      if ($scope.currentRoom) {
        Rooms.placeReadMarker($scope.currentRoom);
      }

      $scope.currentRoom = room;
      $scope.setCurrentDiscussion();

      localStorageService.set('currentRoomId', room ? room.id : null);

      if (room) {
        Messages.update(room);

        // TODO: Smarter handling of when to mark a message as read. Maybe delay?
        Rooms.markAllAsRead(room);
      }
    };

    $scope.leaveRoom = function (room) {
      if (room === $scope.currentRoom) {
        $scope.showRoom(null);
      }

      Rooms.close(room);
    };

    $scope.upload = function (file) {
      if ($scope.currentDiscussion.id) {
        Messages.upload($scope.currentRoom, file, [],
          $scope.currentDiscussion.id);
      } else {
        Messages.upload($scope.currentRoom, file, []);
      }
    };

    $scope.user = function (userId) {
      return Users.get(userId);
    };

    $scope.me = function () {
      return Users.me;
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

    $scope.isOnline = function (userId) {
      return Users.isOnline(userId);
    };

    $scope.$on('TOKEN_EXPIRED', function () {
      FlowdockAuth.refreshToken();
    });

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
          var parent;
          if ((parent = Messages.get(message.parent, $scope.currentRoom.id))) {
            angular.copy({
              id: parent.id,
              title: parent.content
            }, $scope.currentDiscussion);
          } else {
            angular.copy({
              id: message.id,
              title: message.content.file_name
            }, $scope.currentDiscussion);
          }
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

    $scope.isMergeCommit = function (commit) {
      return commit.message.indexOf('Merge pull request') === 0;
    };
  });
