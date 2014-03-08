'use strict';

describe('Controller: ChartContextCtrl', function () {

  // load the controller's module
  beforeEach(module('hipflowApp'));

  var ChartContextCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartContextCtrl = $controller('ChartContextCtrl', {
      $scope: scope
    });
  }));


});
