'use strict';

angular.module('hipFlowApp')
  .controller('MessageWindowCtrl', function ($scope, Flowdock) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;
  });
