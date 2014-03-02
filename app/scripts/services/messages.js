'use strict';

angular.module('hipflowApp')
  .service('Messages', function Messages($rootScope, Flowdock, localStorageService) {
    var messages = localStorageService.get('messages') || {};

    return {
      messages: messages,

      send: function (room, message, tags) {
        Flowdock.messages(room).send(message, tags);
      },
      sendPrivate: function (user, message, tags) {
        Flowdock.privateMessages(user).send(message, tags);
      },

      add: function (message) {
        this.addOrUpdate(message, true);
      },

      addOrUpdate: function (message, append) {
        var roomChatLogs = messages[message.flow];
        var existing = this.get(message.uuid || message.id, message.flow);

        if (existing) {
          angular.copy(message, existing);
          message = existing;
        }

        if (!existing && append) {
          roomChatLogs.push(message);
        }
      },

      edit: function (message) {
        if (message.event !== 'message-edit') {
          throw new Error('Expected event "message-edit" but found "' + message.event + '"');
        }

        var messageToEdit = this.get(message.content.message, message.flow);

        if (messageToEdit) {
          messageToEdit.content = message.content.updated_content;
        }
      },

      get: function (messageId, roomId) {
        var roomChatLogs = messages[roomId];

        if (!roomChatLogs) {
          return null;
        }

        return roomChatLogs.filter(function (m) {
          return m.id === messageId || m.uuid === messageId;
        })[0] || null;
      },

      update: function (room, options) {
        var _this = this;

        var r = room.access_mode ?
          Flowdock.flows('skilitics', room.id) :
          Flowdock.privateConversations(room.id);

        r.messages.list(options, function (messages) {
          messages.forEach(function (message) {
            _this.addOrUpdate(message);
          });
        });
      }
    };
  });
