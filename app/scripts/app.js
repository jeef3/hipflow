'use strict';

angular.module('hipFlowApp', [
    'ngCookies',
    'ngSanitize',
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($locationProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('hipflow');
  })
  .run(function ($window, FlowdockAuth) {
    if (!FlowdockAuth.isAuthenticated()) {
      $window.location.href = '/login';
    }
  });
