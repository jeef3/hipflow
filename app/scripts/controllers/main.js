'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, $timeout, $location, Flowdock, localStorageService) {
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

    $scope.show = function (chatId) {
      $scope.$broadcast('SHOW_CHAT', chatId);
    };
  });
