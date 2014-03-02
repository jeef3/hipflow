'use strict';

angular.module('hipflowApp', [
    'ngCookies',
    'ngSanitize',
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($locationProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('hipflow');
  })
  .run(function ($window, Flowdock, FlowdockAuth, IncomingMessageHandler) {
    if (!FlowdockAuth.isAuthenticated()) {
      $window.location.href = '/login';
    }

    Flowdock.connect();
    IncomingMessageHandler.start();
  });
