'use strict';

describe('Filter: limitWithEllipsis', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var limitWithEllipsis;
  beforeEach(inject(function ($filter) {
    limitWithEllipsis = $filter('limitWithEllipsis');
  }));

});
