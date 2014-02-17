'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope, $filter, Flowdock) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;

    $scope.messages = [];

    $scope.$watch('currentRoom', function (room) {
      $scope.messages = Flowdock.data.chatLogs[room.id];
    });

    $scope.isContinuousNext = function (message) {
      return message.continuity && message.continuity.hasNext;
    };

    $scope.isContinuousPrevious = function (message) {
      return message.continuity && message.continuity.hasPrevious;
    }
  });
