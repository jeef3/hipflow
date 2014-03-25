'use strict';

angular.module('hipflowApp')
  .service('Notifications', function Notifications($rootScope, $window, $document, Rooms) {

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
      if ($document.hidden) {
        return;
      }

      var room = Rooms.getForMessage(message);

      new Notification(room.name, {
        body: message.content,
        tag: message.id
      });
    });
  });
