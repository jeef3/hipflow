'use strict';

angular.module('hipflowApp')
  .directive('moreContent', function () {
    return {
      templateUrl: '/views/directives/more-content.html',
      restrict: 'E',
      transclude: true,
      scope: true
    };
  });
