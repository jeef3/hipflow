'use strict';

angular.module('hipFlowApp')
  .controller('RoomCtrl', function ($scope, Flowdock) {
    $scope.rooms = [];
    $scope.queries = [];

    Flowdock.getRooms()
      .then(function (result) {
        $scope.rooms = result.data;
      });

    Flowdock.getQueries()
      .then(function (result) {
        $scope.queries = result.data;
      });

    $scope.$on('SHOW_CHAT', function (e, chatId) {
      $scope.currentRoom = chatId;
    });
  });
