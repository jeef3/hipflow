'use strict';

angular.module('hipflowApp')
  .directive('uiScrollBottom', function () {
    return {
      restrict: 'A',
      scope: true,

      link: function postLink(scope, element, attrs) {
        var container = element[0],
          buffer = attrs.uiScrollBottomBuffer || 50;

        var elementAdded = function (mutations) {
          var heightAdded = 0;

          mutations.forEach(function (m) {
            [].slice.call(m.addedNodes).forEach(function (n) {
              heightAdded += n.clientHeight || 0;
            });
          });

          var height = container.scrollHeight - container.clientHeight,
            position = container.scrollTop;

          if (position + heightAdded + buffer > height) {
            container.scrollTop = height;
          }
        };

        var observer = new MutationObserver(elementAdded);

        var config = {
          childList: true
        };

        observer.observe(container, config);

        scope.$on('$destroy', function() {
          observer.disconnect();
        });
      }
    };
  });
