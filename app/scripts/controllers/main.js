'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, Flowdock) {
    $scope.messages = [];

    var flowdock = new Flowdock();
    flowdock.connect('');

    flowdock.rooms($scope, 'rooms', true);
    flowdock.queries($scope, 'queries', true);

    flowdock.onMessage(function (message) {
      switch (message.event) {
        case 'message':
          $scope.messages.push(message);
          break;
      }

      $scope.$apply();
    });

    $scope.send = function (message) {
      $scope.messages.push({
        user: 'Jeff Knaggs',
        content: message
      });
    };
  });
