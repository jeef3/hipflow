'use strict';

angular.module('slipflowApp')
  .directive('onFileDrop', function () {
    return {
      restrict: 'A',
      scope: {
        callback: '&onFileDrop'
      },

      link: function postLink(scope, element) {

        var dragEnter = function (e) {
          e.preventDefault();
          e.stopPropagation();

          element.addClass('has-file-hover');
        };

        var dragLeave = function () {
          element.removeClass('has-file-hover');
        };

        var dragOver = function (e) {
          e.preventDefault();
          e.stopPropagation();

          element.addClass('has-file-hover');
        };

        var drop = function (e) {
          e.preventDefault();

          element.removeClass('has-file-hover');

          [].slice.call(e.dataTransfer.files).forEach(function (file) {
            scope.callback({ file: file });
          });
        };

        element
          .on('dragenter', dragEnter)
          .on('dragleave', dragLeave)
          .on('dragover', dragOver)
          .on('drop', drop);

        scope.$destroy(function () {
          element
            .off('dragenter', dragEnter)
            .off('dragleave', dragLeave)
            .off('dragover', dragOver)
            .off('drop', drop);
        });
      }
    };
  });
