'use strict';

angular.module('hipflowApp')
  .service('Rooms', function Rooms(Flowdock, localStorageService) {
    var flows = localStorageService.get('flows') || [];
    var privateConversations = localStorageService.get('privateConversations') || [];

    return {
      flows: flows,
      privateConversations: privateConversations,

      get: function (id) {
        var flow = flows.filter(function (f) {
          return f.id === id;
        })[0];

        if (flow) {
          return flow;
        }

        return privateConversations.filter(function (f) {
          return f.id === id;
        });

        // TODO: Handle if the room isn't in the list
      },

      open: [],

      update: function () {
        Flowdock.flows.all(function (data) {
          flows.splice(0);
          data.forEach(flows.push);

          flows.sort(function (a, b) {
            return a.name > b.name;
          });
        });

        Flowdock.privateConversations(function (data) {
          privateConversations.splice(0);
          data.forEach(privateConversations.push);

          privateConversations.sort(function (a, b) {
            return a.name > b.name;
          });
        });
      }
    };
  });
