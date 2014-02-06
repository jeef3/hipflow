'use strict';

describe('Service: flowdock', function () {

  // load the service's module
  beforeEach(module('hipFlowAApp'));

  // instantiate service
  var flowdock;
  beforeEach(inject(function (_flowdock_) {
    flowdock = _flowdock_;
  }));

  it('should do something', function () {
    expect(!!flowdock).toBe(true);
  });

});
