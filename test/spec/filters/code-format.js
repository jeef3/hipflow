'use strict';

describe('Filter: codeFormat', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var codeFormat;
  beforeEach(inject(function ($filter) {
    codeFormat = $filter('codeFormat');
  }));

});
