'use strict';

angular.module('slipflowApp')
  .service('Notifications', function Notifications($rootScope, $window, Users, Rooms, MessageSeer) {

    if (!('Notification' in $window)) {
      return;
    }

    var Notification = $window.Notification;

    if (Notification.permission !== 'granted') {
      Notification.requestPermission(function (status) {
        Notification.permission = status;
      });
    }

    $rootScope.$on('MESSAGE_ADDED', function (e, message) {
      if (MessageSeer.sawMessage(message)) {
        return;
      }

      var room = Rooms.getForMessage(message);

      new Notification(room.name, {
        body: message.content,
        tag: message.id
      });
    });
  });
