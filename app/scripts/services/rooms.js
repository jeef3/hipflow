'use strict';

angular.module('hipflowApp')
  .service('Rooms', function Rooms(Flowdock, localStorageService) {
    var flows = localStorageService.get('flows') || [];
    var privateConversations = localStorageService.get('privateConversations') || [];

    return {
      flows: flows,
      privateConversations: privateConversations,

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
