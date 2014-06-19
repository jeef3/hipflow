'use strict';

angular.module('slipflowApp')
  .filter('inlineCode', function () {
    return function (input) {
      var inlineCodeBlocks = input.match(/`(.*)`/i);

      if (inlineCodeBlocks) {
        // TODO: Wrap in <code>
      }
      return input;
    };
  });
