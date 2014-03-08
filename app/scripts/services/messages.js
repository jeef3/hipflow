'use strict';

angular.module('hipflowApp')
  .service('Messages', function Messages($rootScope, Flowdock, Users, localStorageService, Uuid) {
    var messages = localStorageService.get('messages') || {};

    return {
      messages: messages,

      send: function (flow, message, tags, messageId) {
        var uuid = Uuid.generate();

        // Add to the chat roomw straight away
        this.add({
          flow: flow.id,
          event: messageId ? 'comments' : 'message',
          content: message,
          message: messageId,
          sent: new Date().getTime(),
          tags: tags,
          user: Number(Users.me.id).toString(),
          uuid: uuid
        });

        // Post to Flowdock
        if (messageId) {
          Flowdock.flows(flow.organization.parameterized_name, flow.parameterized_name)
            .messages(messageId)
            .comments
            .send(message, uuid, tags);
        } else {
          Flowdock.flows(flow.organization.parameterized_name, flow.parameterized_name)
            .messages
            .send(message, uuid, tags);
        }
      },
      sendPrivate: function (userId, message, tags) {
        Flowdock.privateConversations(userId).send(message, tags);
      },

      add: function (message) {
        this.addOrUpdate(message, true);
      },

      addOrUpdate: function (message, append) {
        var roomId = Flowdock.util.roomIdFromMessage(message, Users.me);
        var roomChatLogs = messages[roomId];

        if (!roomChatLogs) {
          roomChatLogs = messages[roomId] = [];
        }

        var existing = this.get(message.uuid || message.id, roomId);

        if (existing) {
          angular.copy(message, existing);
          return;
        }

        roomChatLogs.push(message);

        if (!existing && append) {
          return;
        }

        roomChatLogs.sort(function (m1, m2) {
          return m1.sent - m2.sent;
        });
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
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        r.messages.list(options, function (messages) {
          messages.forEach(_this.addOrUpdate.bind(_this));

          localStorageService.set('messages', _this.messages);
        });
      }
    };
  });
