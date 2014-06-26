'use strict';

angular.module('slipflowApp')
  .service('Rooms', function Rooms($window, Flowdock, Users, DocumentTitle, localStorageService) {
    var flows = localStorageService.get('flows') || [];
    var privateConversations = localStorageService.get('privateConversations') || [];

    return {
      flows: flows,
      privateConversations: privateConversations,

      openFlows: function () {
        return flows.filter(function (room) {
          return room.open;
        });
      },

      addOrUpdateFlow: function (flow) {
        var existing = this.get(flow.id);

        if (existing) {
          existing.hasUnread =
            new Date(flow.last_message_at) >
            new Date(existing.lastSeenAt);

          angular.extend(existing, flow);
          return;
        }

        this.flows.push(flow);

        this.flows.sort(function (f1, f2) {
          return f1.id < f2.id;
        });
      },

      addOrUpdatePrivateConversation: function (privateConversation) {
        var existing = this.get(privateConversation.id);

        if (existing) {
          existing.hasUnread =
            new Date(privateConversation.last_message_at) >
            new Date(existing.lastSeenAt);

          angular.extend(existing, privateConversation);
          return;
        }

        this.privateConversations.push(privateConversation);

        this.privateConversations.sort(function (c1, c2) {
          return c1.id < c2.id;
        });
      },

      newMessage: function (message) {
        if (parseInt(message.user) === Users.me.id) {
          return;
        }

        if (!$window.document.hasFocus()) {
          return;
        }

        // This is effectivly updating the rooms last seen timestamp. Might be
        // better if this is handled differently?
        var room = this.getForMessage(message);
        room.lastSeenAt = new Date();
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
        if (!room) {
          return;
        }

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
        } else if (message.content.typing === false) {
          user.typing = false;
        } else {
          user.last_ping = message.sent;
        }
      },

      markAllAsRead: function (room) {
        room.hasUnread = false;
        this.save();

        var unreadFlows = flows.filter(function (f) {
          return f.hasUnread;
        });
        var unreadPrivateConversations = privateConversations.filter(function (pr) {
          return pr.hasUnread;
        });

        if (!unreadFlows.length || !unreadPrivateConversations.length) {
          DocumentTitle.clear();
        }

        // Mark all mentions as read
        var r = room.access_mode ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        var unread = ':unread:' + Users.me.id;

        r.messages.list({ tags: unread }, function (messages) {
          messages.forEach(function (message) {
            var tags = message.tags;
            tags.splice(tags.indexOf(unread), 1);

            r.messages(message.id).update({ tags: tags });
          });
        });
      },

      placeReadMarker: function (room) {
        room.lastSeenAt = new Date();
        this.save();
      },

      open: function (room) {
        var isFlow = !!room.access_mode;

        // Open locally
        room.open = true;
        this.save();

        // Open on Flowdock
        var r = isFlow ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        r.open(this.update.bind(this));
      },

      close: function (room) {
        var isFlow = !!room.access_mode;

        // Close locally
        room.open = false;
        this.save();

        // Close on Flowdock
        var r = isFlow ?
          Flowdock.flows(room.organization.parameterized_name, room.parameterized_name) :
          Flowdock.privateConversations(room.id);

        r.close(this.update.bind(this));
      },

      save: function () {
        localStorageService.set('flows', this.flows);
        localStorageService.set('privateConversations', this.privateConversations);
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
