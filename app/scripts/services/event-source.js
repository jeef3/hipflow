'use strict';

angular.module('slipflowApp')
  .service('EventSource', function EventSource($window) {
    return $window.EventSource;
  });
