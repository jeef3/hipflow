'use strict';

describe('Filter: messageLinks', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var messageLinks;
  beforeEach(inject(function ($filter) {
    messageLinks = $filter('messageLinks');
  }));

  it('should return the input prefixed with "messageLinks filter:"', function () {
    var text = 'angularjs';
    expect(messageLinks(text)).toBe('messageLinks filter: ' + text);
  });

});
