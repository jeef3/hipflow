'use strict';

describe('Service: FlowdockText', function () {

  // load the service's module
  beforeEach(module('hipFlowAApp'));

  // instantiate service
  var FlowdockText;
  beforeEach(inject(function (_FlowdockText_) {
    FlowdockText = _FlowdockText_;
  }));

  it('should do something', function () {
    expect(!!FlowdockText).toBe(true);
  });

});
