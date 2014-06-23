'use strict';

describe('Service: FlowdockStream', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var FlowdockStream;
  beforeEach(inject(function (_FlowdockStream_) {
    FlowdockStream = _FlowdockStream_;
  }));

  it('should do something', function () {
    expect(!!FlowdockStream).toBe(true);
  });

});
