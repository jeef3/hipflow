'use strict';

angular.module('hipFlowApp')
  .directive('focusOn', function () {
    return {
      restrict: 'AC',

      link: function postLink(scope, element, attrs) {
        scope.$on(attrs.focusOn, function () {
          element[0].focus();
        });
      }
    };
  });
