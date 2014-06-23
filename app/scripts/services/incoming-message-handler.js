'use strict';

angular.module('slipflowApp')
  .service('IncomingMessageHandler', function IncomingMessageHandler($rootScope, Messages, Users, Rooms) {

    return {
      handleMessage: function (message) {
        switch (message.event) {
          case 'message':
          case 'comment':
          case 'file':
          case 'vcs':
          case 'jira':
          case 'mail':
            Messages.add(message);
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
          case 'message-delete':
            Messages.delete(message);
            $rootScope.$broadcast('MESSAGE_DELETED', message);
            console.log('Deleting message', message);
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
      }
    };
  });
