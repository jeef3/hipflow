'use strict';

describe('Filter: emoji', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var emoji;
  beforeEach(inject(function ($filter) {
    emoji = $filter('emoji');
  }));

  it('should return the input prefixed with "emoji filter:"', function () {
    var text = 'angularjs';
    expect(emoji(text)).toBe('emoji filter: ' + text);
  });

});
