'use strict';

describe('Filter: messageLinks', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var messageLinks;
  beforeEach(inject(function ($filter) {
    messageLinks = $filter('messageLinks');
  }));

});
