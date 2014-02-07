'use strict';

angular.module('hipFlowApp')
  .controller('MessagesCtrl', function ($scope, $location, Flowdock, localStorageService) {
    var currentRoomId;
    $scope.isLoading = true;
    $scope.logs = localStorageService.get('chatLogs') || {};
    $scope.messages = [];

    $scope.send = function (message) {
      $scope.messages.push({
        user: 'Jeff Knaggs',
        content: message
      });
    };

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

    var maybeLoadMore = function () {
      $scope.isLoading = true;

      if (parseInt(currentRoomId, 10)) {
        Flowdock.getPrivateMessages(currentRoomId)
          .then(loadMessages);
      } else {
        Flowdock.getMessages(currentRoomId)
          .then(loadMessages);
      }
    };

    var showRoom = function (chatId) {
      if (!$scope.logs[chatId]) {
        // TODO: Get it
        $scope.logs[chatId] = [];
      }

      currentRoomId = chatId;
      $scope.messages = $scope.logs[chatId];

      maybeLoadMore();
    };

    // $scope.$on('SHOW_CHAT', function (e, chatId) {
    //   showRoom(chatId);
    // });

    $scope.$on('$locationChangeSuccess', function () {
      var path = $location.path();
    });
  });
