'use strict';

describe('Service: FlowdockUrl', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var FlowdockUrl;
  beforeEach(inject(function (_FlowdockUrl_) {
    FlowdockUrl = _FlowdockUrl_;
  }));

  it('should do something', function () {
    expect(!!FlowdockUrl).toBe(true);
  });

});
