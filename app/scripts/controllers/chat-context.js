'use strict';

angular.module('slipflowApp')
  .controller('ChatContextCtrl', function ($scope, Threads, Sources) {

    var update = function (room) {
      if (!room) {
        return;
      }

      $scope.threads = Threads.getThreads(room.id);
      $scope.sources = Sources.getSources(room.id);

      Sources.update(room);
    };

    $scope.$watch('currentRoom', function (room) {
      update(room);
    });

    update($scope.currentRoom);
  });
