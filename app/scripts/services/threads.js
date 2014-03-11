'use strict';

angular.module('hipflowApp')
  .service('Threads', function Threads(Flowdock, localStorageService) {
    return {
      rooms: {},

      getThreads: function (roomId) {
        var threads = this.rooms[roomId];
        if (!threads) {
          threads = this.rooms[roomId] = [];
        }

        return threads;
      },

      addMessageToThread: function (message) {
        if (message.event !== 'comment') {
          return;
        }

        var roomId = Flowdock.util.roomIdFromMessage(message);
        var threads = this.getThreads(roomId);

        var threadId = message.parent;

        var existing = threads.filter(function (thread) {
          return thread.id === threadId;
        })[0];

        if (existing) {
          existing.lastActivity = Math.max(existing.lastActivity, message.sent);
        } else {
          threads.push({
            id: threadId,
            title: message.content.title,
            muted: false
          });
        }

        localStorageService.set('threads', this.rooms);
      }
    };
  });
