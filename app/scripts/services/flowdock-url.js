'use strict';

angular.module('slipflowApp')
  .service('FlowdockUrl', function FlowdockUrl(FlowdockAuth) {

    var apiBase = 'https://api.flowdock.com';
    var streamBase = 'https://stream.flowdock.com';

    var flowdockUrl = {};

    Object.defineProperty(flowdockUrl, 'apiBase', {
      get: function () { return apiBase; }
    });
    Object.defineProperty(flowdockUrl, 'streamBase', {
      get: function () { return streamBase; }
    });

    flowdockUrl.url = function (base, path, params) {
      var url = base + path;
      var token = FlowdockAuth.token();
      var options = angular.extend({}, params, { access_token: token });

      var firstParam = true;
      Object.keys(options).forEach(function (key) {
        url = url + (firstParam ? '?' : '&') + key + '=' + options[key];
        firstParam = false;
      });

      return url;
    };

    return flowdockUrl;
  });
