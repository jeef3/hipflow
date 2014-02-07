'use strict';

angular.module('hipFlowApp', [
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($httpProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('hipflow');
  });
