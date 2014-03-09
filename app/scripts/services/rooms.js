'use strict';

angular.module('hipflowApp')
  .service('Rooms', function Rooms(Flowdock, Users, localStorageService) {
    var flows = localStorageService.get('flows') || [];
    var privateConversations = localStorageService.get('privateConversations') || [];

    return {
      flows: flows,
      privateConversations: privateConversations,

      open: function () {
        return flows.filter(function (room) {
          return room.open;
        });
      },

      addOrUpdateFlow: function (flow) {
        var existing = this.get(flow.id);

        // Normalize unread
        flow.unread = flow.unread_mentions || 0;

        if (existing) {
          angular.copy(flow, existing);
          return;
        }

        this.flows.push(flow);

        this.flows.sort(function (f1, f2) {
          return f1.id < f2.id;
        });
      },

      addOrUpdatePrivateConversation: function (privateConversation) {
        var existing = this.get(privateConversation.id);

        // Normalize unread
        privateConversation.unread = privateConversation.activity.mentions || 0;

        if (existing) {
          angular.copy(privateConversation, existing);
          return;
        }

        this.privateConversations.push(privateConversation);

        this.privateConversations.sort(function (c1, c2) {
          return c1.id < c2.id;
        });
      },

      get: function (id) {
        var flow = flows.filter(function (f) {
          return f.id === id;
        })[0];

        if (flow) {
          return flow;
        }

        return privateConversations.filter(function (f) {
          return f.id === parseInt(id);
        })[0];

        // TODO: Handle if the room isn't in the list
      },

      getForMessage: function (message) {
        var roomId = Flowdock.util.roomIdFromMessage(message, Users.me);
        return this.get(roomId);
      },

      userActivity: function (message) {
        var roomId = Flowdock.util.roomIdFromMessage(message, Users.me);

        var room = this.get(roomId);

        var user = room.users.filter(function (user) {
          return user.id === parseInt(message.user);
        })[0];

        if (!user) {
          return;
        }

        if (message.content.last_activity) {
          user.last_activity = message.content.last_activity;
        } else if (message.content.typing) {
          user.last_activity = message.sent;
          user.typing = true;
        } else {
          user.last_ping = message.sent;
        }
      },

      clearMentions: function (room) {
        var r = room.access_mode ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        var unread = ':unread:' + Users.me.id;

        room.unread = 0;

        r.messages.list({ tags: unread }, function (messages) {
          messages.forEach(function (message) {
            var tags = message.tags;
            tags.splice(tags.indexOf(unread), 1);

            r.messages(message.id).update({ tags: tags });
          });
        });

      },

      close: function (room) {
        var r = room.access_mode ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        r.close(this.update);
      },

      update: function () {
        var _this = this;

        Flowdock.flows.allWithUsers(function (flows) {
          flows.forEach(_this.addOrUpdateFlow.bind(_this));
          localStorageService.set('flows', _this.flows);
        });

        Flowdock.privateConversations.list(function (privateConversations) {
          privateConversations.forEach(_this.addOrUpdatePrivateConversation.bind(_this));
          localStorageService.set('privateConversations', _this.privateConversations);
        });
      }
    };
  });
