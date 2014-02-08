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
      getUser: function (id) {
        // TODO cycle through users to find user
      },
      getRoom: function (roomId) {
        var room = data.rooms.filter(function (room) {
          return room.id === roomId;
        });

        if (room && room.length) {
          return room[0];
        }

        room = data.queries.filter(function (query) {
          return query.id === roomId;
        });

        return room[0];
      },
      getPrivateMessages: function (userId, sinceId) {
        var deferred = $q.defer();
        $http.get(api('private/' + userId + '/messages?since_id=' + sinceId))
          .success(function (messages) {
            deferred.resolve(messages);
          })
          .error(function () {
            deferred.reject();
          });

        return deferred.promise;
      },
      getMessages: function (flowId, sinceId) {
        var deferred = $q.defer();
        $http.get(api('flows/' + flowId + '/messages?since_id=' + sinceId))
          .success(function (messages) {
            deferred.resolve(messages);
          })
          .error(function () {
            deferred.reject();
          });

        return deferred.promise;
      }
    };
  });
