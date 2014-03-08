'use strict';

angular.module('hipflowApp')
  .controller('MessageWindowCtrl', function ($scope, $filter, Flowdock, Messages, Rooms, Users) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;

    $scope.messages = Messages.messages[$scope.room.id];

    $scope.mentionsMe = function (message) {
      if (!message.mentions || !message.mentions.length) {
        return false;
      }

      var me = message.mentions.filter(function (mention) {
        return mention === Flowdock.me().id;
      });

      return me.length > 0;
    };

    $scope.isThreadStart = function (message) {
      // TODO: This needs some more work
      return !!message.lastUpdate;
    };

    $scope.isMonologue = function (message, index) {
      var previous = $scope.messages[index - 1];

      return previous &&
        message.user === previous.user &&
        message.app === previous.app;
    };

    $scope.isSameDay = function (message, index) {
      var previous = $scope.messages[index - 1];

      if (!previous) {
        return true;
      }

      return new Date(message.sent).getDate() ===
        new Date(previous.sent).getDate();
    };

    $scope.getMessageMeta = function (message) {
      if (message.event === 'message' ||
          message.event === 'comment' ||
          message.event === 'file') {

        var user = Users.get(message.user);

        return {
          author: user.name,
          avatar: user.avatar
        };
      }

      switch (message.event) {
        case 'jira':
          return { author: 'JIRA' };
        case 'vcs':
          return { author: 'GitHub' };
      }
    };
  });
