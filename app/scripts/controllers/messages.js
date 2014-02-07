'use strict';

angular.module('hipFlowApp')
  .controller('MessagesCtrl', function ($scope, Flowdock, localStorageService) {
    var currentRoom = null;

    $scope.logs = localStorageService.get('chatLogs') || {};
    $scope.messages = [];

    $scope.send = function (message) {
      $scope.messages.push({
        user: 'Jeff Knaggs',
        content: message
      });
    };

    Flowdock.listen(['message'], function (message) {
      if (message.flow) {
        if (!$scope.logs[message.flow]) {
          $scope.logs[message.flow] = [];
        }

        $scope.logs[message.flow].push(message);
      } else if (message.to) {
        var log = message.to === Flowdock.me().id ?
          message.user :
          message.to;

        if (!$scope.logs[log]) {
          $scope.logs[log] = [];
        }

        $scope.logs[log].push(message);
      }

      localStorageService.add('chatLogs', $scope.logs);
    });

    $scope.$on('SHOW_CHAT', function (e, chatId) {
      currentRoom = chatId;
      $scope.messages = $scope.logs[chatId];
    });
  });
