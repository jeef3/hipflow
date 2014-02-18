'use strict';

angular.module('hipFlowApp')
  .service('FlowdockAuth', function FlowdockAuth($http, $cookies, $q) {
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

    this.refreshTokens = function () {
      var deferred = $q.defer();
      var finished = {
        token: false,
        streamToken: false
      };

      this.refreshToken()
        .success(function () {
          finished.token = true;
          if (finished.streamToken) {
            deferred.resolve();
          }
        })
        .error(function (err) {
          deferred.reject(err);
        });

      this.refreshStreamToken()
        .success(function () {
          finished.streamToken = true;
          if (finished.token) {
            deferred.resolve();
          }
        })
        .error(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    this.refreshToken = function () {
      return $http.post('/oauth/refresh', {
          params: { refresh_token: auth.refresh_token }
        })
        .success(function (authResponse) {
          auth = authResponse;
          $cookies.flowauth = JSON.stringify(auth);
        });
    };

    this.refreshStreamToken = function () {
      return $http.post('/oauth/stream/refresh', {
          params: { refresh_token: streamAuth.refresh_token }
        })
        .success(function (authResponse) {
          streamAuth = authResponse;
          $cookies.flowauthStream = JSON.stringify(streamAuth);
        });
    };
  });
