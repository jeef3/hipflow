import request from 'browser-request';
import _ from 'lodash';

import FlowdockAuth from './flowdock-auth';

var apiBase = 'https://api.flowdock.com';
var streamBase = 'https://stream.flowdock.com';

var url = function (base, path, params) {
  var url = base + path;
  var token = FlowdockAuth.token();
  var options = _.assign({}, params, { access_token: token });

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

  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'GET',
      json: true
    }, function (err, response, body) {
      if (err) {
        if (response.status === 401) {
          // TODO: Token expired
          // $rootScope.$broadcast('TOKEN_EXPIRED');
        }
        reject(err);
        return;
      }

      resolve(body);
    });
  });
};

var apiPost = function (path, data) {
  var url = apiUrl(path);

  return new Promise((resolve, reject) => {
    request({
        url,
        method: 'POST',
        json: true,
        body: data
      }, function (err, response, body) {
        if (err) {
          if (response.status === 401) {
            // TODO: Token expired
            // $rootScope.$broadcast('TOKEN_EXPIRED');
          }
          reject(err);
          return;
        }

        resolve(body);
      });
  });
};

var apiPut = function (path, data) {
  var url = apiUrl(path);

  return new Promise((resolve, reject) => {
    request({
        url,
        method: 'PUT',
        json: true,
        body: data
      }, function (err, response, body) {
        if (err) {
          if (response.status === 401) {
            $rootScope.$broadcast('TOKEN_EXPIRED');
          }
          reject(err);
          return;
        }

        resolve(body);
      });
  });
};

var apiUpload = function (file, uuid, path, cb, progressCb) {

  var formData = new FormData();
  formData.append('uuid', uuid);
  formData.append('event', 'file');
  formData.append('content', file);

  var xhr = new XMLHttpRequest();

  if (cb) {
    xhr.upload.onload = cb;
  }

  if (progressCb) {
    xhr.upload.onprogress = progressCb;
  }

  xhr.open('POST', apiUrl(path));
  xhr.send(formData);
};

var flow = function (organization, flowName) {

  var message = function (messageId) {

    var comments = function (commentId, cb) {
      apiGet('/flows/' + organization + '/' + flowName + '/messages/' + messageId + '/comments/' + commentId)
      .then(cb);
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
        promise.then(cb);
      }
    };

    comments.upload = function (file, uuid, tags, cb, progressCb) {
      var path = '/flows/' + organization + '/' + flowName + '/messages/' + messageId + '/comments';
      apiUpload(file, uuid, path, cb, progressCb);
    };

    return {
      update: function (props, cb) {
        var method = '/flows/' + organization + '/' + flowName + '/messages/' + messageId;
        var promise = apiPut(method, props);

        if (cb) {
          promise.then(cb);
        }
      },

      comments: comments
    };
  };

  var messages = function (messageId, cb) {
    if (cb) {
      apiGet('/flows/' + organization + '/' + flowName + '/messages/' + messageId)
      .then(cb);
    } else {
      return message(messageId);
    }
  };

  messages.list = function (options) {
    // TODO: Options for since_id etc
    return apiGet('/flows/' + organization + '/' + flowName + '/messages', options);
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
      promise.then(cb);
    }
  };

  messages.upload = function (file, uuid, tags, cb, progressCb) {
    var path = '/flows/' + organization + '/' + flowName + '/messages';
    apiUpload(file, uuid, path, cb, progressCb);
  };

  var source = function (/*sourceId*/) {

  };

  var sources = function (sourceId, cb) {
    if (cb) {
      apiGet('/flows/' + organization + '/' + flowName, '/sources/' + sourceId)
      .then(cb);
    } else {
      return source(sourceId);
    }
  };

  sources.list = function (cb) {
    apiGet('/flows/' + organization + '/' + flowName + '/sources')
    .then(cb);
  };

  return {
    update: function (props, cb) {
      var method = '/flows/' + organization + '/' + flowName;
      var promise = apiPut(method, props);

      if (cb) {
        promise.then(cb);
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

    messages: messages,
    sources: sources
  };
};

var flows = function (organization, flowName, cb) {
  if (cb) {
    apiGet('flows/' + organization + '/' + flowName).then(cb);
  } else {
    return flow(organization, flowName);
  }
};

flows.list = function () {
  return apiGet('/flows');
};

flows.all = function () {
  return apiGet('/flows/all');
};

flows.allWithUsers = function (cb) {
  apiGet('/flows/all', { users: 1 }).then(cb);
};

flows.create = function (organization, name, cb) {
  apiPost('/flows/' + organization, { name: name }).then(cb);
};

var privateConversation = function (userId) {

  var message = function (messageId) {
    return {
      update: function (props, cb) {
        var method = '/private/' + userId + '/messages/' + messageId;
        var promise = apiPut(method, props);

        if (cb) {
          promise.then(cb);
        }
      }
    };
  };

  var messages = function (messageId, cb) {
    if (cb) {
      apiGet('/private/' + userId + '/messages' + messageId)
      .then(cb);
    } else {
      return message(messageId);
    }
  };

  messages.list = function (options) {
    return apiGet('/private/' + userId + '/messages', options);
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
      promise.then(cb);
    }
  };

  messages.upload = function (file, uuid, cb, progressCb) {
    var path = '/private/' + userId + '/messages';
    apiUpload(file, uuid, path, cb, progressCb);
  };

  return {
    update: function (props, cb) {
      var method = '/private/' + userId;
      var promise = apiPut(method, props);

      if (cb) {
        promise.then(cb);
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
    apiGet('/private/' + userId).then(cb);
  } else {
    return privateConversation(userId);
  }
};

privateConversations.list = function () {
  return apiGet('/private');
};

var user = function (cb) {
  apiGet('/user').then(cb);
};

var users = function () {

};

users.list = function () {
  return apiGet('/users');
};

module.exports = {
  stream: function (flows, options) {
    var url = streamUrl(flows, options);
    var stream = new EventSource(url, { withCredentials: false });

    return {
      onmessage: function (fn) {
        stream.onmessage = function (e) {
          fn.call(this, JSON.parse(e.data));
        };
      },
      onopen: function (fn) {
        fn.call(this);
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
    },
    url: apiUrl
  },

  on: function () {
    return false;
  }
};
