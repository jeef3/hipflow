'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope, Flowdock) {
    $scope.isLoading = true;

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

    // if (room.search(/^private\//) !== -1) {
    //     var privateChatId = room.match(/^private\/(.*)/)[1];
    //     Flowdock.getPrivateMessages(privateChatId).then(loadMessages);
    //   } else {
    //     Flowdock.getMessages(room).then(loadMessages);
    //   }

    var loadMessages = function (messages) {
      messages.forEach(function (message) {
        addMessage(currentRoomId, message);
      });

      localStorageService.add('chatLogs', $scope.logs);
      $scope.isLoading = false;
    };


  });
