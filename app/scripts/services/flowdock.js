'use strict';

angular.module('hipFlowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope, FlowdockAuth, localStorageService, Uuid) {

    var data = {
      users: localStorageService.get('users') || [],
      rooms: localStorageService.get('rooms') || [],
      queries: localStorageService.get('queries') || [],

      chatLogs: localStorageService.get('chatLogs') || {},
      discussions: localStorageService.get('discussions') || {}
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

    var apiPut = function (path, params) {
      var url = 'https://api.flowdock.com/' + path;
      var token = FlowdockAuth.token();
      var data = angular.extend({}, params, { access_token: token });

      return $http.put(url, data);
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

        switch (message.event) {
          case 'message':
          case 'comment':
          case 'vcs':
            handleMessage(message);
            $rootScope.$broadcast('NEW_MESSAGE', message);
            break;
          case 'activity.user':
            handleUserHeartbeat(message);
            break;
          default:
            console.log(message);
        }

        $rootScope.$apply();
      };
    };

    var handleMessage = function (message) {
      var roomId;

      if (message.flow) {
        roomId = message.flow;
      } else if (message.to) {
        roomId = message.to === me().id ?
          message.user :
          message.to;
      }

      addMessagesToRoom(message, roomId);
    };

    var handleUserHeartbeat = function (message) {
      var room = getRoomById(message.flow ? message.flow : message.user);

      if (!room) {
        return;
      }

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
          addMessagesToRoom(messages, room.id);
        });
    };

    var addMessagesToRoom = function (messages, roomId) {
      if (!(messages instanceof Array)) {
        messages = [messages];
      }

      if (!data.chatLogs[roomId]) {
        data.chatLogs[roomId] = [];
      }

      if (!data.discussions[roomId]) {
        data.discussions[roomId] = [];
      }

      messages.forEach(function (message) {
        // Look to see if it exists
        var exists = data.chatLogs[roomId].filter(function (m) {
          return (typeof m.uuid !== 'undefined' && m.uuid === message.uuid) ||
            m.id === message.id;
        })[0];

        // TODO: There may be ways to stop here, before all the processing below
        // If it exists, update it
        if (exists) {
          angular.copy(message, exists);
        } else {
          data.chatLogs[roomId].push(message);
        }

        // Pull out any user mentions, attach them straight to the message
        var mentionRegex = new RegExp(/^:(user|highlight):(\d+)$/);
        message.mentions = message.tags
          .filter(function (tag) {
            return mentionRegex.test(tag);
          })
          .map(function (tag) {
            return mentionRegex.exec(tag)[2];
          });

        // 'comments' belong to discussions
        if (message.event === 'comment') {
          var discussionRegex = new RegExp(/^influx:(\d+)$/);
          var discussionId = message.tags
            .filter(function (tag) {
              return discussionRegex.test(tag);
            })
            .map(function (tag) {
              return discussionRegex.exec(tag)[1];
            })[0];

          discussionId = parseInt(discussionId, 10);

          var discussionHead = data.discussions[roomId].filter(function (m) {
            return m.id === discussionId;
          })[0];

          // Search the chat log, it might not exist because this is the first
          // comment.
          if (!discussionHead) {
            discussionHead = data.chatLogs[roomId].filter(function (m) {
              return m.id === discussionId;
            })[0];
          }

          if (!discussionHead) {
            // TODO: API call to get the head message
            var room = getRoomById(roomId);
            var method = 'flows/' +
              room.organization.parameterized_name + '/' +
              room.parameterized_name +
              '/messages/' +
              discussionId;

            apiGet(method)
              .success(function (m) {
                updateRoomDiscussion(roomId, m, message);
              });

          } else {
            updateRoomDiscussion(roomId, discussionHead, message);
          }
        }
      });

      localStorageService.set('chatLogs', data.chatLogs);
    };

    var updateRoomDiscussion = function (roomId, discussion, message) {
      if (message.sent > (discussion.lastUpdate || 0)) {
        discussion.lastUpdate = message.sent;
      }

      var exists = data.discussions[roomId].filter(function (d) {
        return d.id === discussion.id;
      });
      if (!exists.length) {
        data.discussions[roomId].push(discussion);
      }

      localStorageService.set('discussions', data.discussions);
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

      messageData.user = me().id;
      messageData.uuid = Uuid.generate();

      data.chatLogs[room.id].push(messageData);
      apiPost(method, messageData);
    };

    var leaveRoom = function (room) {
      var method;
      if (room.access_mode) {
        // flow
      } else {
        method = 'private/' + room.id;
      }

      apiPut(method, { open: false });
    };

    return {
      data: data,
      connect: connect,
      me: me,
      getUserById: getUserById,
      getRoomById: getRoomById,
      getMessagesForRoom: getMessagesForRoom,
      sendMessageToRoom: sendMessageToRoom,
      leaveRoom: leaveRoom
    };
  });
