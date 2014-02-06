'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, Flowdock) {
    $scope.rooms = [
      { name: 'Idle chit-chat' },
      { name: 'Dev' }
    ];

    $scope.queries = [
      { name: 'Alan', online: true },
      { name: 'Serge', online: false }
    ];

    $scope.messages = [
      {
        user: 'Jeff Knaggs',
        content: 'Maybe have screenshots of situation/options for context?\nnearly every page will have a learner search. Should it be a right-side filter?'
      }
    ];

    $scope.send = function (message) {
      $scope.messages.push({
        user: 'Jeff Knaggs',
        content: message
      });
    };
  });
