'use strict';

describe('Filter: inlineCode', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var inlineCode;
  beforeEach(inject(function ($filter) {
    inlineCode = $filter('inlineCode');
  }));

  it('should return the input prefixed with "inlineCode filter:"', function () {
    var text = 'angularjs';
    expect(inlineCode(text)).toBe('inlineCode filter: ' + text);
  });

});
