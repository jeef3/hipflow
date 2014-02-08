'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock) {
    // Flowdock.connect('');
    $scope.flowdock = Flowdock.data;
    $scope.currentRoom = null;

    $scope.showRoom = function (room) {
      $scope.currentRoom = room;
    };

    $scope.leaveRoom = function (room) {
      // TODO: Leave room
    };
  });
