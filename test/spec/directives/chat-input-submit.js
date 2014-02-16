'use strict';

describe('Directive: chatInput', function () {

  // load the directive's module
  beforeEach(module('hipFlowApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chat-input></chat-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chatInput directive');
  }));
});
