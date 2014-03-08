'use strict';

describe('Service: Threads', function () {

  // load the service's module
  beforeEach(module('hipflowApp'));

  // instantiate service
  var Threads;
  beforeEach(inject(function (_Threads_) {
    Threads = _Threads_;
  }));

  it('should do something', function () {
    expect(!!Threads).toBe(true);
  });

});
