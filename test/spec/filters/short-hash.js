'use strict';

describe('Filter: shortHash', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var shortHash;
  beforeEach(inject(function ($filter) {
    shortHash = $filter('shortHash');
  }));

  it('should return the input prefixed with "shortHash filter:"', function () {
    var text = 'angularjs';
    expect(shortHash(text)).toBe('shortHash filter: ' + text);
  });

});
