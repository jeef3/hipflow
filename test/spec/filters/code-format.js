'use strict';

describe('Filter: codeFormat', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var codeFormat;
  beforeEach(inject(function ($filter) {
    codeFormat = $filter('codeFormat');
  }));

  it('should return the input prefixed with "codeFormat filter:"', function () {
    var text = 'angularjs';
    expect(codeFormat(text)).toBe('codeFormat filter: ' + text);
  });

});
