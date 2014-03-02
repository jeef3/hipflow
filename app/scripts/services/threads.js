'use strict';

angular.module('hipflowApp')
  .service('Threads', function Threads(localStorageService) {
    var data = localStorageService.get('discussions') || {};

    return {
      data: data
    };
  });
