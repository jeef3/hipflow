'use strict';

angular.module('hipflowApp')
  .service('IncomingMessageHandler', function IncomingMessageHandler($rootScope, Messages, Users, Rooms, Flowdock) {

    var handleMessage = function (message) {
      switch (message.event) {
        case 'message':
        case 'comment':
        case 'file':
        case 'vcs':
        case 'jira':
          Messages.addOrUpdate(message);
          $rootScope.$broadcast('NEW_MESSAGE', message);
          console.log('Handled message', message);
          break;
        case 'message-edit':
          Messages.edit(message);
          $rootScope.$broadcast('NEW_MESSAGE', message);
          console.log('Editing message', message);
          break;
        case 'tag-change':
          Messages.edit(message);
          console.log('Tag Change', message);
          break;
        case 'activity.user':
          Users.userActivity(message);
          Rooms.userActivity(message);
          console.log('User activity', message);
          break;
        default:
          console.log('Unhandled', message);
      }

      $rootScope.$apply();
    };

    var stream;

    return {
      start: function () {
        stream = Flowdock.stream(Rooms.open(), { user: 1, active: 'true' });
        stream.onmessage(handleMessage);

        // TODO: If Rooms.open changes, re-connect
        // TODO: Handle idle here as well, maybe?
        // TODO: Handle reconnecting when network comes back?
      }
    };
  });
