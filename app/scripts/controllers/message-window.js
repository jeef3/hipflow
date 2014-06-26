'use strict';

angular.module('slipflowApp')
  .controller('MessageWindowCtrl', function ($scope, $filter, Flowdock, Messages, Rooms, Users) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;

    $scope.messages = Messages.getRoom($scope.room.id);

    $scope.isMonologue = function (message, index) {
      var previous = $scope.messages[index - 1];

      if (message.user === '0') {
        return previous &&
          message.event === previous.event;
      } else {
        return previous &&
          message.user === previous.user &&
          message.app === previous.app;
      }
    };

    $scope.isSameDay = function (message, index) {
      var previous = $scope.messages[index - 1];

      if (!previous) {
        return true;
      }

      return new Date(message.sent).getDate() ===
        new Date(previous.sent).getDate();
    };

    $scope.isFirstUnseen = function (room, message, index) {
      if (!room.lastVisited) {
        return false;
      }

      var messageDate = new Date(message.sent);

      var previous = $scope.messages[index - 1];
      if (previous) {
        return new Date(previous.sent) < new Date(room.lastSeenAt) &&
          new Date(room.lastSeenAt) < messageDate;
      } else {
        return new Date(room.lastSeenAt) < messageDate;
      }
    };

    $scope.getMessageMeta = function (message) {
      if (message.event === 'message' ||
          message.event === 'comment' ||
          message.event === 'file') {

        var user = Users.get(message.user);

        return {
          author: user.name,
          avatar: user.avatar + '60'
        };
      }

      switch (message.event) {
        case 'jira':
          return {
            author: 'JIRA',
            avatar: '/images/jira/avatar.png'
          };
        case 'vcs':
          return {
            author: 'GitHub',
            avatar: '/images/github/avatar.png'
          };
      }
    };
  });
