'use strict';

angular.module('slipflowApp')
  .service('IncomingMessageHandler', function IncomingMessageHandler($rootScope, Flowdock, Rooms) {

    var handleMessage = function (message) {
      switch (message.event) {
        case 'message':
        case 'comment':
        case 'file':
        case 'vcs':
        case 'jira':
        case 'mail':
          console.log('Message', message);
          $rootScope.$broadcast('MESSAGE_ADDED', message);
          break;
        case 'message-edit':
        case 'tag-change':
          console.log('Message edit', message);
          $rootScope.$broadcast('MESSAGE_EDITED', message);
          break;
        case 'message-delete':
          console.log('Message delete', message);
          $rootScope.$broadcast('MESSAGE_DELETED', message);
          break;
        case 'activity.user':
          console.log('User activity', message);
          $rootScope.$broadcast('USER_ACTIVITY', message);
          break;
        default:
          console.log('Unhandled', message);
      }

      $rootScope.$apply();
    };

    var stream;

    return {
      start: function () {
        stream = Flowdock.stream(Rooms.openFlows(), { user: 1, active: 'true' });
        stream.onmessage(handleMessage);

        // TODO: If Rooms.open changes, re-connect
        // TODO: Handle idle here as well, maybe?
        // TODO: Handle reconnecting when network comes back?
      }
    };
  });
