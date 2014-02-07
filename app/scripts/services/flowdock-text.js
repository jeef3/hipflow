'use strict';

angular.module('hipFlowApp')
  .service('FlowdockText', function FlowdockText($window) {
    return $window.FlowdockText;
  });
