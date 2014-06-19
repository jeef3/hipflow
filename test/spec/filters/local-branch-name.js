'use strict';

describe('Filter: localBranchName', function () {

  // load the filter's module
  beforeEach(module('slipflowApp'));

  // initialize a new instance of the filter before each test
  var localBranchName;
  beforeEach(inject(function ($filter) {
    localBranchName = $filter('localBranchName');
  }));

});
