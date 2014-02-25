'use strict';

angular.module('hipFlowApp')
  .service('FlowdockMessage', function FlowdockMessage(FlowdockData) {

    return {
      d: FlowdockData,
      addOrUpdate: function (message, append) {
        var roomChatLogs = FlowdockData.chatLogs[message.flow];

        var existing = roomChatLogs.filter(function (m) {
          return (typeof m.uuid !== 'undefined' && m.uuid === message.uuid) ||
            m.id === message.id;
        });

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

        var messageToEdit = this.get(message.flow, message.content.message);

        if (messageToEdit) {
          messageToEdit.content = message.content.updated_content;
        }
      },

      get: function (roomId, messageId, byUuid) {
        var roomChatLogs = FlowdockData.chatLogs[roomId];

        if (!roomChatLogs) {
          return null;
        }

        return roomChatLogs.filter(function (m) {
          return byUuid ? m.uuid === messageId : m.id === messageId;
        })[0];
      }
    };
  });
