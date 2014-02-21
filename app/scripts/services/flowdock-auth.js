'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth($http, $cookies, $q) {
    var auth = {};

    this.isAuthenticated = function () {
      try {
        auth = JSON.parse($cookies.flowauth);
      } catch (err) {
        return false;
      }

      return !!auth.access_token;
    };

    this.logout = function () {
      delete $cookies.flowauth;
    };

    this.token = function () {
      return auth.access_token;
    };

    this.refreshToken = function () {
      return $http.post('/oauth/refresh', {
          refresh_token: auth.refresh_token
        })
        .success(function (authResponse) {
          auth = authResponse;
          $cookies.flowauth = JSON.stringify(auth);
        });
    };
  });
