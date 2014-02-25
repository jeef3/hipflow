'use strict';

angular.module('hipFlowApp')
  .service('FlowdockMessage', function FlowdockMessage(FlowdockData) {

    return {
      // addOrUpdate: function (message, roomId) {

      // },

      edit: function (message) {
        if (message.event !== 'message-edit') {
          throw new Error('Expected event "message-edit" but found "' + message.event + '"');
        }

        var messageToEdit = this.get(message.flow, message.content.message);

        if (messageToEdit) {
          messageToEdit.content = message.content.updated_content;
        }
      },

      get: function (roomId, messageId) {
        var roomChatLogs = FlowdockData.chatLogs[roomId];

        if (!roomChatLogs) {
          return null;
        }

        return roomChatLogs.filter(function (m) {
          return m.id === messageId;
        })[0];
      }
    };
  });
