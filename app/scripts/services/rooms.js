'use strict';

angular.module('hipflowApp')
  .service('Rooms', function Rooms(Flowdock, localStorageService) {
    var flows = localStorageService.get('flows') || [];
    var privateConversations = localStorageService.get('privateConversations') || [];

    return {
      flows: flows,
      privateConversations: privateConversations,

      addOrUpdateFlow: function (flow) {
        var existing = this.get(flow.id);

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
          return f.id === id;
        })[0];

        // TODO: Handle if the room isn't in the list
      },

      close: function (room) {
        var r = room.access_mode ?
          Flowdock.flows(room.id) :
          Flowdock.privateConversations(room.id);

        r.close(this.update);
      },

      update: function () {
        var _this = this;

        Flowdock.flows.all(function (flows) {
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
