'use strict';

angular.module('slipflowApp', [
    'ngCookies',
    'ngSanitize',
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($locationProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('slipflow');
  })
  .run(function ($window, $rootScope, Notifications, Flowdock, FlowdockAuth, FlowdockStream, Users, Rooms, IncomingMessageHandler) {

    $rootScope.online = $window.navigator.onLine;
    var onlineHandler = function () {
      $rootScope.online = $window.navigator.onLine;
      $rootScope.$apply();
    };

    $window.addEventListener('online', onlineHandler, false);
    $window.addEventListener('offline', onlineHandler, false);

    if (!FlowdockAuth.isAuthenticated()) {
      $window.location.href = '/login';
    }

    Users.update();
    Rooms.update();

    FlowdockStream
      .onmessage(IncomingMessageHandler.handleMessage)
      .connect(Rooms.openFlows(), true, true);
  });
