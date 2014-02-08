'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope, Flowdock) {
    // $scope.messages = Flowdock.messages;
    $scope.isLoading = true;

    $scope.messages = [{ content: 'hai' }];

    var addMessage = function (log, message) {
      if (!$scope.logs[log]) {
        $scope.logs[log] = [message];
        return;
      }

      var exists = $scope.logs[log].filter(function (m) {
        return m.uuid === message.uuid;
      });

      if (exists.length) {
        return;
      }

      $scope.logs[log].push(message);
    };

    var loadMessages = function (messages) {
      messages.forEach(function (message) {
        addMessage(currentRoomId, message);
      });

      localStorageService.add('chatLogs', $scope.logs);
      $scope.isLoading = false;
    };

    Flowdock.listen(['message'], function (message) {
      if (message.flow) {
        addMessage(message.flow, message);
      } else if (message.to) {
        var log = message.to === Flowdock.me().id ?
          message.user :
          message.to;

        addMessage(log, message);
      }

      localStorageService.add('chatLogs', $scope.logs);
    });
  });
