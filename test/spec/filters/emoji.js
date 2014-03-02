'use strict';

describe('Filter: emoji', function () {

  // load the filter's module
  beforeEach(module('hipflowApp'));

  // initialize a new instance of the filter before each test
  var emoji;
  beforeEach(inject(function ($filter) {
    emoji = $filter('emoji');
  }));

});
