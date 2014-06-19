'use strict';

angular.module('slipflowApp')
  .service('FlowdockAuth', function FlowdockAuth() {
    this.isAuthenticated = function () {
      return true;
    };

    this.token = function () {
      return {};
    };
  });
