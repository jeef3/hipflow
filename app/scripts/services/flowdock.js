'use strict';

angular.module('hipFlowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope, localStorageService) {
    // $scope.logs = localStorageService.get('chatLogs') || {};
    var data = {
      users: localStorageService.get('users') || [],
      rooms: localStorageService.get('rooms') || [],
      queries: localStorageService.get('queries') || [],

      chatLogs: localStorageService.get('chatLogs') || {}
    };

    var api = function (url) {
      return 'https://api.flowdock.com/' + url;
    };

    var stream = null;

    var startListening = function () {
      if (stream) {
        stream.close();
      }

      stream = new EventSource(
        'https://stream.flowdock.com/flows?active=true&filter=' + data.rooms.join(',') + '&user=1',
        { withCredentials: true });

      stream.onmessage = function (e) {
        var message = JSON.parse(e.data);

        console.log(message);

        switch (message.event) {
          case 'message':
            handleMessage(message);
            break;
        }

        $rootScope.$apply();
      };
    };

    var handleMessage = function (message) {
      if (message.flow) {
        data.chatLogs[message.flow].push(message);
      } else if (message.to) {
        var log = message.to === Flowdock.me().id ?
          message.user :
          message.to;

        data.chatLogs[log].push(message);
      }

      localStorageService.add('chatLogs', data.chatLogs);
    };

    var updateData = function () {
      $http.get(api('users')).success(function (users) {
        data.users = users;
        localStorageService.add('users', users);
      });

      $http.get(api('flows/all?users=1')).success(function (rooms) {
        data.rooms = rooms;
        localStorageService.add('rooms', rooms);
      });

      $http.get(api('private')).success(function (queries) {
        data.queries = queries;
        localStorageService.add('queries', queries);
      });
    };

    return {
      data: data,
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

        updateData();
        startListening();
        return this;
      },
      me: function () {
        return { id: '58790' };
      },
      getUserById: function (userId) {
        var user = data.users.filter(function (user) {
          return user.id === parseInt(userId, 10);
        });

        return user[0];
      },
      getRoomById: function (roomId) {
        var room = data.rooms.filter(function (room) {
          return room.id === roomId;
        });

        if (room && room.length) {
          return room[0];
        }

        room = data.queries.filter(function (query) {
          return query.id === parseInt(roomId, 10);
        });

        return room[0];
      },
      getMessagesForRoom: function (room, sinceId) {
        var method;
        if (room.access_mode) {
          method = 'flows/' +
            room.organization.parameterized_name + '/' +
            room.parameterized_name +
            '/messages';
        } else {
          method = 'private/' + room.id + '/messages';
        }

        $http.get(api(method))
          .success(function (messages) {
            if (!data.chatLogs[room.id]) {
              data.chatLogs[room.id] = [];
            }

            messages.forEach(function (message) {
              var exists = data.chatLogs[room.id].filter(function (m) {
                return m.uuid === message.uuid;
              });

              if (exists.length) {
                return;
              }

              data.chatLogs[room.id].push(message);
            });

            localStorageService.add('chatLogs', data.chatLogs);
          });
      }
    };
  });
