'use strict';

angular.module('hipflowApp')
  .service('Notifications', function Notifications($rootScope, $window, Users, Rooms) {

    if (!('Notification' in $window)) {
      console.log('No notifications');
      return;
    }

    var Notification = $window.Notification;

    if (Notification.permission !== 'granted') {
      Notification.requestPermission(function (status) {
        Notification.permission = status;
      });
    }

    $rootScope.$on('NEW_MESSAGE', function (e, message) {
      if ($window.document.hasFocus()) {
        return;
      }

      if (parseInt(message.user) === Users.me.id) {
        return;
      }

      var room = Rooms.getForMessage(message);

      new Notification(room.name, {
        body: message.content,
        tag: message.id
      });
    });
  });
