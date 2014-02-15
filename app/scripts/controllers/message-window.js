'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;
  });
