'use strict';

describe('Service: avatars', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var Avatars;
  beforeEach(inject(function (_Avatars_) {
    Avatars = _Avatars_;
  }));

  it('should do something', function () {
    expect(!!Avatars).toBe(true);
  });

});
