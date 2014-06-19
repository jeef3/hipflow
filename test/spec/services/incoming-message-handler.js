'use strict';

describe('Service: IncomingMessageHandler', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var IncomingMessageHandler;
  beforeEach(inject(function (_IncomingMessageHandler_) {
    IncomingMessageHandler = _IncomingMessageHandler_;
  }));

  it('should do something', function () {
    expect(!!IncomingMessageHandler).toBe(true);
  });

});
