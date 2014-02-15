'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope, Flowdock) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;

    $scope.messages = Flowdock.data.chatLogs[$scope.room.id]; //| orderBy:'sent';

    $scope.isContinuous = function (message) {
      var index = $scope.messages.indexOf(message);
      var previousUser;
      var nextUser;

      if (index !== 0) {
        previousUser = $scope.messages[index - 1].user;
      }

      if (index !== $scope.messages.length - 1) {
        nextUser = $scope.messages[index + 1].user;
      }

      var continuous = {};
      continuous.hasPrevious = previousUser === message.user;
      continuous.hasNext = nextUser === message.user;

      return continuous;
    };
  });
