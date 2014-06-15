'use strict';

angular.module('hipflowApp')
  .service('Messages', function Messages($rootScope, Flowdock, Users, Threads, Uuid) {
    var MESSAGE_BUFFER_LENGTH = 30;

    var addTag = function (tag) {
      this.tags.push(tag);
    };

    var removeTag = function (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    };

    var influxRegex = /^influx:(\d+)$/;
    var processTags = function (message) {
      var tags = message.tags;
      message.highlight = tags.indexOf(':highlight:' + Users.me.id) !== -1;
      message.mentionsMe = tags.indexOf(':user:' + Users.me.id) !== -1;
      message.thread = tags.indexOf(':thread') !== -1;

      if (message.event === 'comment') {
        message.parent = tags
          .filter(function (tag) {
            return influxRegex.test(tag);
          })
          .map(function (tag) {
            return influxRegex.exec(tag)[1];
          })[0];
      }
    };

    var processThread = function (message) {
      Threads.addMessageToThread(message);
    };

    return {
      messages: {},

      send: function (room, message, tags, messageId) {
        var uuid = Uuid.generate();

        // Add to the chat room straight away
        this.add({
          app: 'chat',
          flow: room.id,
          event: messageId ? 'comment' : 'message',
          content: messageId ? { text: message} : message,
          message: messageId,
          sent: new Date().getTime(),
          tags: tags,
          user: Number(Users.me.id).toString(),
          uuid: uuid
        });

        var r = room.access_mode ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        // Post to Flowdock
        if (messageId) {
          r.messages(messageId)
            .comments
            .send(message, uuid, tags);
        } else {
          r.messages
            .send(message, uuid, tags);
        }
      },

      upload: function (room, file, tags, messageId) {
        var uuid = Uuid.generate();

        var r = room.access_mode ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        var message = {
          app: 'chat',
          flow: room.id,
          event: 'file',
          content: {
            data: null,
            content_type: file.type,
            file_name: file.name
          },
          message: messageId,
          sent: new Date().getTime(),
          tags: tags,
          user: Users.me.id.toString(),
          uuid: uuid,

          progress: 25
        };

        var progress = function (e) {
          var progress = Math.round(e.position / e.total) * 100;
          message.progress = progress;

          this.addOrUpdate(message, false, false);
        };

        // Add to the chat room straight away
        this.add(message);

        // Post to Flowdock
        if (messageId) {
          r.messages(messageId)
            .comments
            .upload(file, uuid, tags, null, progress);
        } else {
          r.messages
            .upload(file, uuid, tags, null, progress);
        }
      },

      add: function (message) {
        this.addOrUpdate(message, true, true);
      },

      addOrUpdate: function (message, append, prune) {
        var roomId = Flowdock.util.roomIdFromMessage(message, Users.me);
        var roomChatLogs = this.messages[roomId];

        if (!roomChatLogs) {
          roomChatLogs = this.messages[roomId] = [];
        }

        processTags(message);
        processThread(message);

        var existing = this.get(message.uuid || message.id, roomId);

        if (existing) {
          angular.copy(message, existing);
          return;
        }

        roomChatLogs.push(message);

        if (!append) {
          roomChatLogs.sort(function (m1, m2) {
            return m1.sent - m2.sent;
          });
        }

        if (prune && roomChatLogs.length > MESSAGE_BUFFER_LENGTH) {
          roomChatLogs.splice(0, roomChatLogs.length - MESSAGE_BUFFER_LENGTH);
        }
      },

      edit: function (message) {
        var existing = this.get(message.content.message, message.flow);

        if (!existing) {
          return;
        }

        if (message.event === 'message-edit') {
          existing.content = message.content.updated_content;
        } else if (message.event === 'tag-change') {
          message.content.add.forEach(addTag.bind(existing));
          message.content.remove.forEach(removeTag.bind(existing));
        }

        processTags(existing);
      },

      get: function (messageId, roomId) {
        var roomChatLogs = this.messages[roomId];

        if (!roomChatLogs) {
          return null;
        }

        return roomChatLogs.filter(function (m) {
          return m.id === messageId || m.uuid === messageId;
        })[0] || null;
      },

      getRoom: function (roomId) {
        var roomChatLogs = this.messages[roomId];

        if (!roomChatLogs) {
          roomChatLogs = this.messages[roomId] = [];
        }

        return roomChatLogs;
      },

      update: function (room, options) {
        var _this = this;

        var r = room.access_mode ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        r.messages.list(options, function (messages) {
          messages.forEach(function (message) {
            _this.addOrUpdate(message);
          });
        });
      }
    };
  });
