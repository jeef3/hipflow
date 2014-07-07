'use strict';

describe('Filter: commitSummary', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var commitSummary;
  beforeEach(inject(function ($filter) {
    commitSummary = $filter('commitSummary');
  }));

  it('should return the commit summary', function () {
    var text = 'This is a commit summary.\n\nThis is the commit body.';
    expect(commitSummary(text)).toBe('This is a commit summary.');
  });

});
