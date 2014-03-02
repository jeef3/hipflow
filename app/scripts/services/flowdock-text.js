'use strict';

angular.module('hipflowApp')
  .service('FlowdockText', function FlowdockText($window) {
    return $window.FlowdockText;
  });
