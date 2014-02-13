'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth($http, $cookies) {
    var auth = {},
      streamAuth = {};

    this.isAuthenticated = function () {
      try {
        auth = JSON.parse($cookies.flowauth);
        streamAuth = JSON.parse($cookies.flowauthStream);
      } catch (err) {
        return false;
      }

      return !!auth.access_token && !!streamAuth.access_token;
    };

    this.logout = function () {
      delete $cookies.flowauth;
      delete $cookies.flowauthStream;
    };

    this.token = function () {
      return auth.access_token;
    };

    this.streamToken = function () {
      return streamAuth.access_token;
    };

    this.refreshToken = function () {
      $http.post('/oauth/refresh', {
          params: { refresh_token: auth.refresh_token }
        })
        .success(function (authResponse) {
          auth = authResponse;
        });
    };

    this.refreshStreamToken = function () {
      $http.post('/oauth/stream/refresh', {
          params: { refresh_token: streamAuth.refresh_token }
        })
        .success(function (authResponse) {
          streamAuth = authResponse;
        });
    };
  });
