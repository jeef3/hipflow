'use strict';

angular.module('hipFlowApp')
  .controller('MainCtrl', function ($scope, Flowdock) {
    Flowdock.connect('');

    $scope.show = function (chatId) {
      $scope.$broadcast('SHOW_CHAT', chatId);
    };
  });
