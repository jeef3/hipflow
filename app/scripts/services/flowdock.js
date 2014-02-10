'use strict';

angular.module('hipFlowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope, localStorageService, Uuid) {

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

      var rooms = data.rooms.map(function (room) {
        return room.organization.parameterized_name + '/' + room.parameterized_name;
      }).join(',');

      stream = new EventSource(
        'https://stream.flowdock.com/flows?active=true&filter=' + rooms + '&user=1',
        { withCredentials: false });

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
        var log = message.to === '58790' ?
          message.user :
          message.to;

        // TODO: Check for existing
        data.chatLogs[log].push(message);
      }

      localStorageService.add('chatLogs', data.chatLogs);
    };

    var updateData = function () {
      $http.get(api('users')).success(function (users) {
        data.users = users;
        localStorageService.add('users', users);
      });

      $http.get(api('flows/all'), { params: { users: 1 } }).success(function (rooms) {
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
      connect: function (credentials) {
        if (credentials.email && credentials.password) {
          $http.defaults.headers.common.Authorization = 'Basic ' + btoa(
            credentials.email + ':' + credentials.password);
        }

        updateData();
        startListening();
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
                return (typeof m.uuid !== 'undefined' && m.uuid === message.uuid) ||
                  m.id === message.id;
              });

              if (exists.length) {
                return;
              }

              data.chatLogs[room.id].push(message);
            });

            localStorageService.add('chatLogs', data.chatLogs);
          });
      },
      sendMessageToRoom: function (message, room) {
        var method,
          messageData = {
            event: 'message',
            content: message
          };

        if (room.access_mode) {
          method = 'messages';
          messageData.flow = room.id;
        } else {
          method = 'private/' + room.id + '/messages';
        }

        method.uuid = Uuid.generate();

        data.chatLogs[room.id].push(message);
        $http.post(api(method), messageData);
      }
    };
  });
