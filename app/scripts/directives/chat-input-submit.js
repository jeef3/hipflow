'use strict';

angular.module('hipFlowApp')
  .directive('chatInputSubmit', function () {
    return {
      restrict: 'AC',
      scope: {
        callback: '&chatInputSubmit'
      },

      link: function postLink(scope, element) {

        element.bind('keydown', function (e) {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            scope.callback();
          }
        });
      }
    };
  });
