'use strict';

angular.module('hipFlowApp')
  .directive('uiScrollBottom', function () {
    return {
      restrict: 'A',
      scope: true,

      link: function postLink(scope, element, attrs) {
        var container = element[0],
          buffer = attrs.uiScrollBottomBuffer || 10;

        var scroll = function () {
          var height = container.scrollHeight - container.clientHeight,
            position = container.scrollTop;

          if (position + buffer < height) {
            container.scrollTop = height;
          }
        };

        var observer = new MutationObserver(scroll);

        var config = {
          childList: true
        };

        observer.observe(element[0].children[0], config);

        scope.$on('$destroy', function() {
          observer.disconnect();
        });
      }
    };
  });
