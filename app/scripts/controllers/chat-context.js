'use strict';

angular.module('hipflowApp')
  .controller('ChatContextCtrl', function ($scope, Threads) {

    if ($scope.currentRoom) {
      $scope.threads = Threads.getThreads($scope.currentRoom.id);
    }

    $scope.$watch('currentRoom', function () {
      if ($scope.currentRoom) {
        $scope.threads = Threads.getThreads($scope.currentRoom.id);
      }
    });
  });
