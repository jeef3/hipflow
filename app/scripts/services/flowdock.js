'use strict';

angular.module('hipflowApp')
  .service('Flowdock', function Flowdock($q, $http, $rootScope, EventSource, FlowdockAuth) {

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
        params = params || {};
        params.filter = flows
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
      var url = apiUrl(path, params);

      return $http.get(url)
        .error(function (data, status) {
          if (status === 401) {
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
        });
    };

    var apiPost = function (path, data) {
      var url = apiUrl(path);

      return $http.post(url, data)
        .error(function (data, status) {
          if (status === 401) {
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
        });
    };

    var apiPut = function (path, data) {
      var url = apiUrl(path);

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
    var flow = function (organization, flowName) {

      var message = function (messageId) {

        var comments = function (commentId, cb) {
          apiGet('/flows/' + organization + '/' + flowName + '/messages/' + messageId + '/comments/' + commentId)
            .success(cb);
        };

        comments.send = function (comment, uuid, tags, cb) {
          // TODO: Allow no uuid by checking to see if it is an array
          var m = {
            event: 'comment',
            content: comment,
            message: messageId,
            tags: tags,
            uuid: uuid
          };

          var method = '/flows/' + organization + '/' + flowName + '/messages/' + messageId + '/comments';
          var promise = apiPost(method, m);

          if (cb) {
            promise.success(cb);
          }
        };

        return {
          update: function (props, cb) {
            var method = '/flows/' + organization + '/' + flowName + '/messages/' + messageId;
            var promise = apiPut(method, props);

            if (cb) {
              promise.success(cb);
            }
          },

          comments: comments
        };
      };

      var messages = function (messageId, cb) {
        if (cb) {
          apiGet('/flows/' + organization + '/' + flowName + '/messages/' + messageId)
            .success(cb);
        } else {
          return message(messageId);
        }
      };

      messages.list = function (options, cb) {
        // TODO: Options for since_id etc
        apiGet('/flows/' + organization + '/' + flowName + '/messages', options).success(cb);
      };

      messages.send = function (message, uuid, tags, cb) {
        // TODO: Allow no uuid by checking to see if it is an array
        var m = {
          event: 'message',
          content: message,
          tags: tags,
          uuid: uuid
        };

        var method = '/flows/' + organization + '/' + flowName + '/messages';
        var promise = apiPost(method, m);

        if (cb) {
          promise.success(cb);
        }
      };

      return {
        update: function (props, cb) {
          var method = '/flows/' + organization + '/' + flowName;
          var promise = apiPut(method, props);

          if (cb) {
            promise.success(cb);
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

        messages: messages
      };
    };

    var flows = function (organization, flowName, cb) {
      if (cb) {
        apiGet('flows/' + organization + '/' + flowName).success(cb);
      } else {
        return flow(organization, flowName);
      }
    };

    flows.list = function (cb) {
      apiGet('/flows').success(cb);
    };

    flows.all = function (cb) {
      apiGet('/flows/all').success(cb);
    };

    flows.allWithUsers = function (cb) {
      apiGet('/flows/all', { users: 1 }).success(cb);
    };

    flows.create = function (organization, name, cb) {
      apiPost('/flows/' + organization, { name: name }).success(cb);
    };

    var privateConversation = function (userId) {

      var message = function (messageId) {
        return {
          update: function (props, cb) {
            var method = '/private/' + userId + '/messages/' + messageId;
            var promise = apiPut(method, props);

            if (cb) {
              promise.success(cb);
            }
          }
        };
      };

      var messages = function (messageId, cb) {
        if (cb) {
          apiGet('/private/' + userId + '/messages' + messageId)
            .success(cb);
        } else {
          return message(messageId);
        }
      };

      messages.list = function (options, cb) {
        apiGet('/private/' + userId + '/messages', options).success(cb);
      };

      messages.send = function (message, uuid, tags, cb) {
        // TODO: Allow no uuid by checking to see if it is an array
        var m = {
          event: 'message',
          content: message,
          tags: tags,
          uuid: uuid
        };

        var method = '/private/' + userId + '/messages';
        var promise = apiPost(method, m);

        if (cb) {
          promise.success(cb);
        }
      };

      return {
        update: function (props, cb) {
          var method = '/private/' + userId;
          var promise = apiPut(method, props);

          if (cb) {
            promise.success(cb);
          }
        },
        open: function (cb) {
          return this.update({ open: true }, cb);
        },
        close: function (cb) {
          return this.update({ open: false }, cb);
        },

        messages: messages
      };
    };

    var privateConversations = function (userId, cb) {
      if (cb) {
        apiGet('/private/' + userId).success(cb);
      } else {
        return privateConversation(userId);
      }
    };

    privateConversations.list = function (cb) {
      apiGet('/private').success(cb);
    };

    var user = function (cb) {
      apiGet('/user').success(cb);
    };

    var users = function (/*id, cb*/) {

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

      user: user,
      users: users,
      flows: flows,
      privateConversations: privateConversations,

      util: {
        roomIdFromMessage: function (message, me) {
          var roomId;

          if (message.flow) {
            roomId = message.flow;
          } else if (message.to) {
            roomId = parseInt(message.to) === me.id ?
              message.user :
              message.to;
          }

          return roomId;
        }
      }
    };
  });
