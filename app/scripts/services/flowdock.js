'use strict';

angular.module('hipFlowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope) {
    var api = function (url) {
      return 'https://api.flowdock.com/' + url;
    };

    var stream = null,
      listeners = [];

    var startListening = function (rooms) {
      if (stream) {
        stream.close();
      }

      stream = new EventSource(
        'https://stream.flowdock.com/flows?active=true&filter=' + rooms.join(',') + '&user=1',
        { withCredentials: true });

      stream.onmessage = function (e) {
        var _this = this,
          message = JSON.parse(e.data);

        console.log(message);

        listeners.forEach(function (listener) {
          if (listener.events.indexOf(message.event) !== -1) {
            listener.fn.call(_this, message);
          }
        });

        $rootScope.$apply();
      };
    };

    return {
      connect: function () {
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

        $http.get(api('flows'))
          .success(function (result) {
            var rooms = result
              .filter(function (room) {
                return room.open;
              })
              .map(function (room) {
                return room.id;
              });
            startListening(rooms);
          });

        return this;
      },
      listen: function (events, fn) {
        listeners.push({
          events: events,
          fn: fn
        });
      },
      me: function () {
        return { id: '58790' };
      },
      getRooms: function () {
        return $http.get(api('flows'));
      },
      getQueries: function () {
        return $http.get(api('private'));
      }
    };
  });
