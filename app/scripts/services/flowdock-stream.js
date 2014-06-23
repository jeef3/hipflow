'use strict';

angular.module('slipflowApp')
  .service('FlowdockStream', function FlowdockStream($window, FlowdockUrl, EventSource) {

    var stream = null;
    var messageHandler;

    var streamUrl = function (flows, params) {
      if (flows && flows.length) {
        params = params || {};
        params.filter = flows
          .map(function (flow) {
            return flow.organization.parameterized_name + '/' +
              flow.parameterized_name;
          })
          .join(',');
      }

      return FlowdockUrl.url(FlowdockUrl.streamBase, '/flows', params);
    };

    var attachMessageHandler = function (fn) {
      if (!stream || !messageHandler) {
        return;
      }

      stream.onmessage = function (e) {
        messageHandler.call(this, JSON.parse(e.data));
      };
    };

    return {
      onmessage: function (fn) {
        messageHandler = fn;
        attachMessageHandler();

        return this;
      },

      connect: function (flows, user, active) {
        if (stream) {
          stream.close();
        }

        var options = {};

        if (user) {
          options.user = 1;
        }

        if (active) {
          options.active = true;
        }

        stream = new EventSource(streamUrl(flows, options),
          { withCredentials: false });

        stream.onerror = function () {
          console.log('Stream error');
        };

        stream.onopen = function () {
          console.log('Stream opened');
        };

        attachMessageHandler();

        $window.addEventListener('online', function () {
          if (stream.readyState === EventSource.CLOSED) {
            connect();
          }
        }, false);

        return this;
      }
    };
  });
