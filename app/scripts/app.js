'use strict';

angular.module('hipFlowApp', [
    'ngSanitize',
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($httpProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('hipflow');
  });
