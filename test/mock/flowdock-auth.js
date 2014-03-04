'use strict';

angular.module('hipflowApp')
  .service('FlowdockAuth', function FlowdockAuth() {
    this.isAuthenticated = function () {
      return true;
    };

    this.token = function () {
      return {};
    };
  });
