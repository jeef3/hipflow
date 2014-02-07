'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $rootScope, Flowdock, localStorageService) {
    Flowdock.connect('');

    $scope.users = localStorageService.get('users') || {};
    Flowdock.getUsers()
      .then(function (result) {
        $scope.users = {};
        result.data.forEach(function (user) {
          $scope.users[user.id] = user;
        });

        localStorageService.add('users', $scope.users);
      });

    $scope.showRoom = function (room) {
      $rootScope.$broadcast('SHOW_ROOM', room);
    };

    $scope.leaveRoom = function (room) {
      $rootScope.$broadcast('LEAVE_ROOM', room);
    };
  });
