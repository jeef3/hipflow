'use strict';

describe('Filter: shortHash', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var shortHash;
  beforeEach(inject(function ($filter) {
    shortHash = $filter('shortHash');
  }));

});
