'use strict';

angular.module('hipflowApp')
  .filter('inlineCode', function () {
    return function (input) {
      var inlineCodeBlocks = input.match(/`(.*)`/i);

      if (inlineCodeBlocks) {
        // TODO: Wrap in <code>
      }
      return input;
    };
  });
