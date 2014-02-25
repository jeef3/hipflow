'use strict';

describe('Service: FlowdockData', function () {

  // load the service's module
  beforeEach(module('hipFlowApp'));

  // instantiate service
  var FlowdockData;
  beforeEach(inject(function (_FlowdockData_) {
    FlowdockData = _FlowdockData_;
  }));

  it('should do something', function () {
    expect(!!FlowdockData).toBe(true);
  });

});
