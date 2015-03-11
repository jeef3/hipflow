'use strict';

angular.module('slipflowApp')
  .controller('MessageWindowCtrl', function ($scope, $filter, Flowdock, Messages, Rooms, Users) {
    $scope.isLoadingOlder = false;
    $scope.isLoadingNewer = false;

    $scope.messages = Messages.getRoom($scope.room.id);

    $scope.isFirstUnseen = function (room, message, index) {
      if (!room.lastSeenAt) {
        return false;
      }

      var messageDate = new Date(message.sent);

      var previous = $scope.messages[index - 1];
      if (previous) {
        return new Date(previous.sent) < new Date(room.lastSeenAt) &&
          new Date(room.lastSeenAt) < messageDate;
      } else {
        return new Date(room.lastSeenAt) < messageDate;
      }
    };
  });
