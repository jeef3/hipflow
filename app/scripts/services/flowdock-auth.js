'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth() {
    this.isAuthenticated = function () {
      return true;
    };
  });
