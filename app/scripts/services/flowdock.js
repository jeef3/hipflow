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
