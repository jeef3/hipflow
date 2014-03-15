'use strict';

angular.module('hipflowApp')
  .service('Sources', function Sources(Flowdock, localStorageService) {
    return {
      sources: localStorageService.get('sources') || {},

      getSources: function (roomId) {
        var sources = this.sources[roomId];
        if (!sources) {
          sources = this.sources[roomId] = [];
        }

        return sources;
      },

      update: function (room) {

        if (!room.access_mode) {
          return;
        }

        var sourcesArray = this.getSources(room.id);

        Flowdock
          .flows(room.organization.parameterized_name, room.parameterized_name)
          .sources
          .list(function (sources) {
            sourcesArray.splice(0);
            sources.forEach(function (source) {
              sourcesArray.push(source);
            });
          });
      }
    };
  });
