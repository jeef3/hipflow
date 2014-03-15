'use strict';

describe('Service: Sources', function () {

  // load the service's module
  beforeEach(module('hipflowApp'));

  // instantiate service
  var Sources;
  beforeEach(inject(function (_Sources_) {
    Sources = _Sources_;
  }));

  it('should do something', function () {
    expect(!!Sources).toBe(true);
  });

});
