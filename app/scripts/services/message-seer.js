'use strict';

angular.module('slipflowApp')
  .service('MessageSeer', function MessageSeer($window, Users) {
    return {
      sawMessage: function (message) {
        return $window.document.hasFocus() || parseInt(message.user) === Users.me.id;
      }
    };
  });
