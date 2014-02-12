'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth($cookies) {
    var tokens = {};

    this.isAuthenticated = function () {
      try {
        tokens = JSON.parse($cookies.flowauth);
      } catch (err) {
        return false;
      }

      return !!tokens.access;
    };

    this.token = function () {
      return tokens.access;
    };
  });
