'use strict';

angular.module('hipFlowApp')
  .factory('Flowdock', function () {

    function Flowdock() {
    }

    Flowdock.prototype.connect = function (token) {
      this.token = token;

      // TODO: Connect
    };

    Flowdock.prototype.onMessage = function (fn) {
      var stream = new EventSource('https://stream.flowdock.com/flows?user=', { withCredentials: true });

      stream.onmessage = function (e) {
        console.log('received');
        var message = JSON.parse(e.data);

        fn(message);
      };
    };

    return Flowdock;
  });
