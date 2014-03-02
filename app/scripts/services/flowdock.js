'use strict';

angular.module('hipflowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope, $window, FlowdockAuth) {
    var EventSource = $window.EventSource;

    var apiBase = 'https://api.flowdock.com';
    var streamBase = 'https://stream.flowdock.com';

    var url = function (base, path, params) {
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

    var streamUrl = function (flows, params) {
      if (flows && flows.length) {
        params.flows
          .filter(function (flow) {
            return flow.open;
          })
          .map(function (flow) {
            return flow.organization.parameterized_name + '/' +
              flow.parameterized_name;
          })
          .join(',');
      }

      return url(streamBase, '/flows', params);
    };

    var apiUrl = function (path, params) {
      return url(apiBase, path, params);
    };

    var apiGet = function (path, params) {
      var url = apiBase + path;
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
      var url = apiBase + path;
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
      var url = apiBase + path;
      var token = FlowdockAuth.token();
      var data = angular.extend({}, params, { access_token: token });

      return $http.put(url, data)
        .error(function (data, status) {
          if (status === 401) {
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
        });
    };



//     var addMessages = function (messages, roomId, append) {
//       messages = messages instanceof Array ? messages : [messages];
//       append = typeof append === 'undefined' ? true : false;

//       initializeRoom(roomId);

//       var roomChatLogs = data.chatLogs[roomId];

//       messages.forEach(function (message) {



//         // Pull out any user mentions, attach them straight to the message
//         var mentionRegex = new RegExp(/^:(user|highlight):(\d+)$/);
//         message.mentions = message.tags
//           .filter(function (tag) {
//             return mentionRegex.test(tag);
//           })
//           .map(function (tag) {
//             return mentionRegex.exec(tag)[2];
//           });

//         // 'comments' belong to discussions
//         if (message.event === 'comment') {
//           var discussionId = getCommentTitleMessageId(message);

//           var discussionHead = data.discussions[roomId].filter(function (m) {
//             return m.id === discussionId;
//           })[0];

//           // Search the chat log, it might not exist because this is the first
//           // comment.
//           if (!discussionHead) {
//             discussionHead = data.chatLogs[roomId].filter(function (m) {
//               return m.id === discussionId;
//             })[0];
//           }

//           if (!discussionHead) {
//             // TODO: API call to get the head message
//             var room = getRoomById(roomId);
//             var method = 'flows/' +
//               room.organization.parameterized_name + '/' +
//               room.parameterized_name +
//               '/messages/' +
//               discussionId;

//             apiGet(method)
//               .success(function (m) {
//                 updateRoomDiscussion(roomId, m, message);
//               });

//           } else {
//             updateRoomDiscussion(roomId, discussionHead, message);
//           }
//         }
//       });

//       // Ensure the list is sorted after adding the message(s)
//       data.chatLogs[roomId].sort(function (m1, m2) {
//         return m1.sent - m2.sent;
//       });

//       localStorageService.set('chatLogs', data.chatLogs);
//     };

//     var handleUserHeartbeat = function (message) {
//
//     };

//     var getRoomIdFromMessage = function (message) {
//       var roomId;

//       if (message.flow) {
//         roomId = message.flow;
//       } else if (message.to) {
//         roomId = message.to === me().id ?
//           message.user :
//           message.to;
//       }
//     };

//     var updateData = function () {
//       apiGet('users').success(function (users) {
//         data.users = users;
//         localStorageService.add('users', users);
//       });

//       apiGet('flows/all', { users: 1 }).success(function (rooms) {
//         data.rooms = rooms;
//         localStorageService.add('rooms', rooms);
//       });

//       apiGet('private').success(function (queries) {
//         data.queries = queries;
//         localStorageService.add('queries', queries);
//       });
//     };

//     var connect = function () {
//       updateData();
//       startListening();
//     };

//     var me = function () {
//       return { id: '58790' };
//     };


//     var getMessagesForRoom = function (room, sinceId) {
//       var method;
//       if (room.access_mode) {
//         method = 'flows/' +
//           room.organization.parameterized_name + '/' +
//           room.parameterized_name +
//           '/messages';
//       } else {
//         method = 'private/' + room.id + '/messages';
//       }

//       apiGet(method, { since_id: sinceId })
//         .success(function (messages) {
//           addMessagesToRoom(messages, room.id);
//         });
//     };

//     var getCommentTitleMessageId = function (comment) {
//       if (comment.message) {
//         return comment.message;
//       }

//       var discussionRegex = new RegExp(/^influx:(\d+)$/);
//       var discussionId = comment.tags
//         .filter(function (tag) {
//           return discussionRegex.test(tag);
//         })
//         .map(function (tag) {
//           return discussionRegex.exec(tag)[1];
//         })[0];

//       return parseInt(discussionId, 10);
//     };

//     var initializeRoom = function (roomId) {
//       data.chatLogs[roomId] = data.chatLogs[roomId] || [];
//       data.discussions[roomId] = data.discussions[roomId] || [];
//     };

//     var updateRoomDiscussion = function (roomId, discussion, message) {
//       if (message.sent > (discussion.lastUpdate || 0)) {
//         discussion.lastUpdate = message.sent;
//       }

//       var exists = data.discussions[roomId].filter(function (d) {
//         return d.id === discussion.id;
//       });
//       if (!exists.length) {
//         data.discussions[roomId].push(discussion);
//       }

//       localStorageService.set('discussions', data.discussions);
//     };

//     var sendMessageToRoom = function (message, room, discussionId) {
//       var method,
//         messageData = {
//           content: message
//         };

//       if (room.access_mode) {
//         messageData.flow = room.id;

//         if (discussionId) {
//           method = 'comments';
//           messageData.event = 'comment';
//           messageData.message = discussionId;
//         } else {
//           method = 'messages';
//           messageData.event = 'message';
//         }
//       } else {
//         method = 'private/' + room.id + '/messages';
//         messageData.event = 'message';
//       }

//       messageData.uuid = Uuid.generate();

//       var stub = angular.extend({}, messageData, {
//         user: me().id,
//         tags: [],
//         sent: new Date().getTime(),
//         content: discussionId ? { text: message } : message
//       });

//       addMessagesToRoom(stub, room.id);
//       apiPost(method, messageData)
//         .success(handleMessage);
//     };

//     var leaveRoom = function (room) {
//       var method;
//       if (room.access_mode) {
//         // flow
//       } else {
//         method = 'private/' + room.id;
//       }

//       apiPut(method, { open: false });
//     };

//     return {
//       data: data,
//       connect: connect,
//       url: apiUrl,
//       me: me,
//       getUserById: getUserById,
//       getRoomById: getRoomById,
//       getMessagesForRoom: getMessagesForRoom,
//       getCommentTitleMessageId: getCommentTitleMessageId,
//       sendMessageToRoom: sendMessageToRoom,
//       leaveRoom: leaveRoom
//     };
    var flow = function (organization, id) {

      return {
        update: function (props, cb) {
          var method = 'flows/' + organization + '/' + id;
          var promise = apiPut(method, props);

          if (cb) {
            promise.then(function (flow) {
              cb(flow);
            });
          }
        },
        rename: function (name, cb) {
          return this.update({ name: name }, cb);
        },
        open: function (cb) {
          return this.update({ open: true }, cb);
        },
        close: function (cb) {
          return this.update({ open: false }, cb);
        },
        join: function (cb) {
          return this.update({ joined: true }, cb);
        },
        leave: function (cb) {
          return this.update({ joined: false }, cb);
        },
        disable: function (cb) {
          return this.update({ disabled: true }, cb);
        },
        enabled: function (cb) {
          return this.update({ disabled: false }, cb);
        },

        access: function (mode, cb) {
          var modes = ['invitation', 'link', 'organization'];

          if (modes.indexOf(mode) === -1) {
            throw new Error('\'' + mode +
              '\' is an invalid access type. Please choose from; ' +
              modes.join(', ') + '.');
          }

          return this.update({ access_mode: mode }, cb);
        },

        messages: {
          list: function (options, cb) {
            apiGet('/flows/' + organization + '/' + id + '/messages', options)
              .success(cb);
          }
        }
      };
    };

    var flows = function (organization, id, cb) {
      if (cb) {
        apiGet('flows/find?id=' + id).then(cb);
      } else {
        return flow(organization, id);
      }
    };

    flows.list = function (cb) {
      apiGet('/flows').success(cb);
    };

    flows.all = function (cb) {
      apiGet('/flows/all').success(cb);
    };

    flows.create = function (organization, name, cb) {
      apiPost('/flows/' + organization, { name: name }).success(cb);
    };

    var privateConversations = function () {

    };

    privateConversations.list = function () {
      apiGet('/private');
    };

    var users = function (id, cb) {

    };

    users.list = function (cb) {
      apiGet('/users').success(cb);
    };

    return {
      connect: function () {},
      stream: function (flows, options) {
        var stream = new EventSource(streamUrl(flows, options),
          { withCredentials: false });

        return {
          onmessage: function (fn) {
            stream.onmessage = function (e) {
              fn.call(this, JSON.parse(e.data));
            };
          },
          close: function () {
            stream.close();
          }
        };
      },

      users: users,
      flows: flows,
      privateConversations: privateConversations
    };
  });
