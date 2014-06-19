'use strict';

describe('Filter: prFromUrl', function () {

  // load the filter's module
  beforeEach(module('hipflowApp'));

  // initialize a new instance of the filter before each test
  var prFromUrl;
  beforeEach(inject(function ($filter) {
    prFromUrl = $filter('prFromUrl');
  }));
});
