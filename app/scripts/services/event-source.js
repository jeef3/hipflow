'use strict';

angular.module('hipflowApp')
  .service('EventSource', function EventSource($window) {
    return $window.EventSource;
  });
