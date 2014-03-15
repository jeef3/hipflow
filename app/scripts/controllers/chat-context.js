'use strict';

angular.module('hipflowApp')
  .controller('ChatContextCtrl', function ($scope, Threads, Sources) {

    var update = function (room) {
      if (room) {
        $scope.threads = Threads.getThreads(room.id);
        $scope.sources = Sources.getSources(room.id);
      }  
    }

    $scope.$watch('currentRoom', function () {
      update($scope.currentRoom);
    });

    update($scope.currentRoom);
  });
