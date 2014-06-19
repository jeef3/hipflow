'use strict';

describe('Filter: inlineCode', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var inlineCode;
  beforeEach(inject(function ($filter) {
    inlineCode = $filter('inlineCode');
  }));

});
