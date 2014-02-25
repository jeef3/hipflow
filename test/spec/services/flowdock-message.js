'use strict';

describe('Service: FlowdockMessage', function () {

  // load the service's module
  beforeEach(module('hipFlowApp'));

  // instantiate service
  var FlowdockMessage;
  beforeEach(inject(function (_FlowdockMessage_) {
    FlowdockMessage = _FlowdockMessage_;
  }));

  it('should do something', function () {
    expect(!!FlowdockMessage).toBe(true);
  });

  describe('addOrUpdate()', function () {

    describe('given a new message', function () {
      it('should add the message to the room', function () {

      });
    });
  });

  describe('edit()', function () {


  });

});
