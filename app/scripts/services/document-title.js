'use strict';

angular.module('slipflowApp')
  .service('DocumentTitle', function DocumentTitle($rootScope, $window, Users) {

    var set = function (title) {
      $window.document.title = title;
    };

    var blink = function (title) {
      // TODO: blink the title
      $window.document.title = title;
    };

    var clear = function () {
      $window.document.title = 'Slipflow';
    };

    $rootScope.$on('MESSAGE_ADDED', function (e, message) {
      if ($window.document.hasFocus()) {
        return;
      }

      if (parseInt(message.user) === Users.me.id) {
        return;
      }

      blink('New message');
    });

    return {
      set: set,
      blink: blink,
      clear: clear
    };
  });
