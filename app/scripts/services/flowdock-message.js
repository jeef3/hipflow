'use strict';

angular.module('hipFlowApp')
  .service('FlowdockMessage', function FlowdockMessage(FlowdockData) {

    return {
      d: FlowdockData,
      addOrUpdate: function (message, append) {
        var roomChatLogs = FlowdockData.chatLogs[message.flow];
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
        var roomChatLogs = FlowdockData.chatLogs[roomId];

        if (!roomChatLogs) {
          return null;
        }

        return roomChatLogs.filter(function (m) {
          return m.id === messageId || m.uuid === messageId;
        })[0] || null;
      }
    };
  });
