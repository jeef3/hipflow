'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth($cookies) {
    var auth = {},
      streamAuth = {};

    this.isAuthenticated = function () {
      try {
        auth = JSON.parse($cookies.flowauth);
        streamAuth = JSON.parse($cookies.flowauthStream);
      } catch (err) {
        return false;
      }

      return !!auth.accessToken && !!streamAuth.accessToken;
    };

    this.logout = function () {
      delete $cookies.flowauth;
      delete $cookies.flowauthStream;
    };

    this.token = function () {
      return auth.accessToken;
    };

    this.streamToken = function () {
      return streamAuth.accessToken;
    };

    this.refreshToken = function () {

    };

    this.refreshStreamToken = function () {

    };
  });
