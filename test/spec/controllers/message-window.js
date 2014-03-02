'use strict';

describe('Controller: MessageWindowCtrl', function () {

  // load the controller's module
  beforeEach(module('hipflowApp'));

  var MessageWindowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessageWindowCtrl = $controller('MessageWindowCtrl', {
      $scope: scope
    });
  }));

});
