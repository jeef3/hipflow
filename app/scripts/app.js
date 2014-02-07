'use strict';

angular.module('hipFlowApp', [
    'ngSanitize',
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($httpProvider, $locationProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('hipflow');

    $locationProvider
      .hashPrefix('!');
  });
