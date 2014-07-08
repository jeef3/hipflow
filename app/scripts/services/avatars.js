'use strict';

angular.module('slipflowApp')
  .service('Avatars', function Avatars($http, localStorageService) {

    var avatars = localStorageService.get('avatars') || {};

    return {
      avatars: avatars,
      getAvatar: function (name) {

        if (!(name in avatars)) {
          avatars[name] = '';

          $http.get('/avatar/github/' + name)
            .success(function (data) {
              avatars[name] = data;
              localStorageService.set('avatars', avatars);

              console.log('saved avatar fo', name);
            });
        }

        return avatars[name];
      }
    };
  });
