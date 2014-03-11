'use strict';

describe('Directive: moreContent', function () {

  // load the directive's module
  beforeEach(module('hipflowApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<more-content></more-content>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the moreContent directive');
  }));
});
