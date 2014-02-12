'use strict';

angular.module('hipFlowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope, FlowdockAuth, localStorageService, Uuid) {

    var data = {
      users: localStorageService.get('users') || [],
      rooms: localStorageService.get('rooms') || [],
      queries: localStorageService.get('queries') || [],

      chatLogs: localStorageService.get('chatLogs') || {}
    };

    var apiGet = function (path, params) {
      var url = 'https://api.flowdock.com/' + path;
      var token = FlowdockAuth.token();
      var options = {
        params: angular.extend({}, params, { access_token: token })
      };

      return $http.get(url, options)
        .error(function (data, status) {
          if (status === 401) {
            FlowdockAuth.logout();
          }
        });
    };

    var apiPost = function (path, params) {
      var url = 'https://api.flowdock.com/' + path;
      var token = FlowdockAuth.token();
      var data = angular.extend({}, params, { access_token: token });

      return $http.post(url, data);
    };

    var stream = null;

    var startListening = function () {
      if (stream) {
        stream.close();
      }

      var rooms = data.rooms
        .filter(function (room) {
          return room.open;
        })
        .map(function (room) {
          return room.organization.parameterized_name + '/' + room.parameterized_name;
        })
        .join(',');

      stream = new EventSource(
        'https://stream.flowdock.com/flows?active=true&filter=' + rooms + '&user=1&access_token=' + FlowdockAuth.streamToken(),
        { withCredentials: false });

      stream.onmessage = function (e) {
        var message = JSON.parse(e.data);

        console.log(message);

        switch (message.event) {
          case 'message':
            handleMessage(message);
            break;
          case 'activity.user':
            handleUserHeartbeat(message);
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

    var handleUserHeartbeat = function (message) {
      var room = getRoomById(message.flow ? message.flow : message.user);

      var user = room.users.filter(function (u) {
        return u.id === parseInt(message.user);
      })[0];

      if (user) {
        user.last_ping = message.sent;
      }
    };

    var updateData = function () {
      apiGet('users').success(function (users) {
        data.users = users;
        localStorageService.add('users', users);
      });

      apiGet('flows/all', { users: 1 }).success(function (rooms) {
        data.rooms = rooms;
        localStorageService.add('rooms', rooms);
      });

      apiGet('private').success(function (queries) {
        data.queries = queries;
        localStorageService.add('queries', queries);
      });
    };

    var connect = function () {
      updateData();
      startListening();
    };
    var me = function () {
      return { id: '58790' };
    };
    var getUserById = function (userId) {
      var user = data.users.filter(function (user) {
        return user.id === parseInt(userId, 10);
      });

      return user[0];
    };
    var getRoomById = function (roomId) {

      // TODO: What to do if looking for me?

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
    };
    var getMessagesForRoom = function (room, sinceId) {
      var method;
      if (room.access_mode) {
        method = 'flows/' +
          room.organization.parameterized_name + '/' +
          room.parameterized_name +
          '/messages';
      } else {
        method = 'private/' + room.id + '/messages';
      }

      apiGet(method, { since_id: sinceId })
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
    };
    var sendMessageToRoom = function (message, room) {
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

      messageData.uuid = Uuid.generate();

      data.chatLogs[room.id].push(messageData);
      apiPost(method, messageData);
    };

    return {
      data: data,
      connect: connect,
      getUserById: getUserById,
      getRoomById: getRoomById,
      getMessagesForRoom: getMessagesForRoom,
      sendMessageToRoom: sendMessageToRoom
    };
  });
