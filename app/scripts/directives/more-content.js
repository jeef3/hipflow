'use strict';

angular.module('slipflowApp')
  .directive('moreContent', function () {
    return {
      templateUrl: '/views/directives/more-content.html',
      restrict: 'E',
      transclude: true,
      scope: {
        content: '='
      }
    };
  });
