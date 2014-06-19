'use strict';

describe('Service: FlowdockAuth', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var FlowdockAuth;
  beforeEach(inject(function (_FlowdockAuth_) {
    FlowdockAuth = _FlowdockAuth_;
  }));

  it('should do something', function () {
    expect(!!FlowdockAuth).toBe(true);
  });

});
