'use strict';

describe('Filter: limitWithEllipsis', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var limitWithEllipsis;
  beforeEach(inject(function ($filter) {
    limitWithEllipsis = $filter('limitWithEllipsis');
  }));

  it('should return the input prefixed with "limitWithEllipsis filter:"', function () {
    var text = 'angularjs';
    expect(limitWithEllipsis(text)).toBe('limitWithEllipsis filter: ' + text);
  });

});
