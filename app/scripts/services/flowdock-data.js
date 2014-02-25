'use strict';

angular.module('hipFlowApp')
  .service('FlowdockData', function FlowdockData(localStorageService) {
    return {
      users: localStorageService.get('users') || [],
      rooms: localStorageService.get('rooms') || [],
      queries: localStorageService.get('queries') || [],

      chatLogs: localStorageService.get('chatLogs') || {},
      discussions: localStorageService.get('discussions') || {}
    };
  });
