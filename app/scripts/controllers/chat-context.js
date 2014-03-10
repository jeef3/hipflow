'use strict';

angular.module('hipflowApp')
  .controller('ChatContextCtrl', function ($scope, Threads) {

    $scope.threads = Threads.getThreads($scope.currentRoom.id);

    $scope.$watch('currentRoom', function () {
      $scope.threads = Threads.getThreads($scope.currentRoom.id);
    });
  });
