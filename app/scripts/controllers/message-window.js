'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope, $filter, Flowdock) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;

    $scope.messages = Flowdock.data.chatLogs[$scope.room.id];

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

    $scope.isMonologue = function (message, index) {
      var previous = $scope.messages[index - 1];

      return previous &&
        message.user === previous.user &&
        message.event === previous.event;
    };
  });
