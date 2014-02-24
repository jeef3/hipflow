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

    var apiUrl = function (path, params) {
      var url = 'https://api.flowdock.com/' + path;
      var token = FlowdockAuth.token();
      var options = angular.extend({}, params, { access_token: token });

      var firstParam = true;
      Object.keys(options).forEach(function (key) {
        url = url + (firstParam ? '?' : '&') + key + '=' + options[key];
        firstParam = false;
      });

      return url;
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
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
        });
    };

    var apiPost = function (path, params) {
      var url = 'https://api.flowdock.com/' + path;
      var token = FlowdockAuth.token();
      var data = angular.extend({}, params, { access_token: token });

      return $http.post(url, data)
        .error(function (data, status) {
          if (status === 401) {
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
        });
    };

    var apiPut = function (path, params) {
      var url = 'https://api.flowdock.com/' + path;
      var token = FlowdockAuth.token();
      var data = angular.extend({}, params, { access_token: token });

      return $http.put(url, data)
        .error(function (data, status) {
          if (status === 401) {
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
        });
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
        'https://stream.flowdock.com/flows?active=true&filter=' + rooms + '&user=1&access_token=' + FlowdockAuth.token(),
        { withCredentials: false });

      stream.onmessage = function (e) {
        var message = JSON.parse(e.data);

        switch (message.event) {
          case 'message':
          case 'comment':
          case 'file':
          case 'vcs':
          case 'jira':
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
        if (message.content.last_activity) {
          user.last_ping = message.content.last_activity;
        } else {
          user.last_ping = message.sent;

          if (Object.keys(message.content).length) {
            console.log('Unknown user.activity', message.content);
          }
        }
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

    var getCommentTitleMessageId = function (comment) {
      if (comment.message) {
        return comment.message;
      }

      var discussionRegex = new RegExp(/^influx:(\d+)$/);
      var discussionId = comment.tags
        .filter(function (tag) {
          return discussionRegex.test(tag);
        })
        .map(function (tag) {
          return discussionRegex.exec(tag)[1];
        })[0];

      return parseInt(discussionId, 10);
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
          message = exists;
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
          var discussionId = getCommentTitleMessageId(message);

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

      // Ensure the list is sorted after adding the message(s)
      data.chatLogs[roomId].sort(function (m1, m2) {
        return m1.sent - m2.sent;
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

    var sendMessageToRoom = function (message, room, discussionId) {
      var method,
        messageData = {
          content: message
        };

      if (room.access_mode) {
        messageData.flow = room.id;

        if (discussionId) {
          method = 'comments';
          messageData.event = 'comment';
          messageData.message = discussionId;
        } else {
          method = 'messages';
          messageData.event = 'message';
        }
      } else {
        method = 'private/' + room.id + '/messages';
        messageData.event = 'message';
      }

      messageData.uuid = Uuid.generate();

      var stub = angular.extend({}, messageData, {
        user: me().id,
        tags: [],
        sent: new Date().getTime(),
        content: discussionId ? { text: message } : message
      });

      addMessagesToRoom(stub, room.id);
      apiPost(method, messageData)
        .success(handleMessage);
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
      url: apiUrl,
      me: me,
      getUserById: getUserById,
      getRoomById: getRoomById,
      getMessagesForRoom: getMessagesForRoom,
      getCommentTitleMessageId: getCommentTitleMessageId,
      sendMessageToRoom: sendMessageToRoom,
      leaveRoom: leaveRoom
    };
  });
