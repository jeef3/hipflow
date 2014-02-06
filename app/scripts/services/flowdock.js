'use strict';

angular.module('hipFlowApp')
  .factory('Flowdock', function ($q, $http) {

    function Flowdock() {
    }

    Flowdock.prototype.connect = function () {
      var credentials = [].slice.call(arguments, 0);

      switch (credentials.length) {
        case 0:
          // No authentication
          break;
        case 1:
          // Token
          break;
        case 2:
          // User/pass
          break;
        default:
          throw new Error('Credentials should be a token or user/pass');
      }

      return this;
    };

    Flowdock.prototype.onMessage = function (fn) {
      var stream = new EventSource('https://stream.flowdock.com/flows?user=58806', { withCredentials: true });

      stream.onmessage = function (e) {
        console.log('received');
        var message = JSON.parse(e.data);

        fn(message);
      };
    };

    Flowdock.prototype.rooms = function (scope, prop, openOnly) {
      scope[prop] = [];

      $http.get('https://api.flowdock.com/flows')
        .success(function (result) {
          scope[prop] = result.filter(function (room) {
            return room.open || !openOnly;
          })
          .map(function (room) {
            return {
              id: room.id,
              name: room.name
            };
          });
        })
        .error(function () {
          scope[prop] = [];
        });

      return this;
    };

    Flowdock.prototype.queries = function (scope, prop, openOnly) {
      $http.get('https://api.flowdock.com/private')
        .success(function (result) {
          scope[prop] = result.filter(function (query) {
            return query.open || !openOnly;
          })
          .map(function (query) {
            return {
              name: query.name
            };
          });
        })
        .error(function () {
          scope[prop] = [];
        });

      return this;
    };

    return Flowdock;
  });
