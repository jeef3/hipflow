'use strict';

angular.module('slipflowApp')
  .directive('uiScrollBottom', function () {
    return {
      restrict: 'A',
      scope: true,

      link: function postLink(scope, element, attrs) {
        var container = element[0];
        var containerSize = container.scrollHeight;
        var position = container.scrollTop;
        var buffer = attrs.uiScrollBottomBuffer || 50;

        var mutated = function () {
          var delta = container.scrollHeight - containerSize;
          var bottom = container.scrollTop + container.clientHeight;

          // Scroll bottom if within buffer
          if (bottom + buffer > containerSize) {
            container.scrollTop = (container.scrollHeight - container.clientHeight);
          }

          containerSize = container.scrollHeight;
        };

        var observer = new MutationObserver(mutated);

        var config = {
          childList: true,
          subtree: true
        };

        observer.observe(container, config);

        scope.$on('$destroy', function() {
          observer.disconnect();
        });
      }
    };
  });
