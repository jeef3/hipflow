'use strict';

describe('Filter: nl2br', function () {

  // load the filter's module
  beforeEach(module('hipFlowApp'));

  // initialize a new instance of the filter before each test
  var nl2br;
  beforeEach(inject(function ($filter) {
    nl2br = $filter('nl2br');
  }));


});
