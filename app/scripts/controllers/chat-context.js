'use strict';

angular.module('hipFlowApp')
  .controller('ChatContextCtrl', function ($scope) {
    $scope.discussions = [
      { title: 'What happened to all the other uses of UrlUtil.GetExternalUrl() ?', muted: true },
      { title: 'Linux gurus ideas easiest way to do this:', muted: false },
      { title: 'I converted INT over to same issue & workflow schemes as the other current projects. Now bugs can be put in testing column!', muted: true }
    ];
  });
