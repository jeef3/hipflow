'use strict';

angular.module('slipflowApp')
  .service('FlowdockText', function FlowdockText($window) {
    return $window.FlowdockText;
  });
