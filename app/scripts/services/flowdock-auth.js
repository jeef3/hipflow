'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth($cookies) {
    var tokens = {},
      streamTokens = {};

    this.isAuthenticated = function () {
      try {
        tokens = JSON.parse($cookies.flowauth);
        streamTokens = JSON.parse($cookies.flowauthStream);
      } catch (err) {
        return false;
      }

      return !!tokens.access && !!streamTokens.access;
    };

    this.token = function () {
      return tokens.access;
    };

    this.streamToken = function () {
      return streamTokens.access;
    };
  });
