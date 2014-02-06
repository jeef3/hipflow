'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, Flowdock) {
    $scope.messages = [];

    var flowdock = new Flowdock();
    flowdock.connect('');

    flowdock.onMessage(function (message) {
      switch (message.event) {
        case 'message':
          $scope.messages.push(message);
          break;
      }

      $scope.$apply();
    });

    $scope.rooms = [
      { name: 'Idle chit-chat' },
      { name: 'Dev' }
    ];

    $scope.queries = [
      { name: 'Alan', online: true },
      { name: 'Serge', online: false }
    ];

    $scope.send = function (message) {
      $scope.messages.push({
        user: 'Jeff Knaggs',
        content: message
      });
    };
  });
