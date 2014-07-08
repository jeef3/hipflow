'use strict';

describe('Service: messageSeer', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var MessageSeer;
  var $window;
  var Users;
  var message;

  beforeEach(inject(function (_MessageSeer_, _$window_, _Users_) {
    MessageSeer = _MessageSeer_;
    $window = _$window_;
    Users = _Users_;

    Users.me = { id: 1 };
    message = {};
  }));

  describe('when the document has focus', function () {
    beforeEach(function () {
      $window.document.hasFocus = function () { return true; };
    });

    describe('and the message belongs to me', function () {
      it('should consider the message seen', function () {
        message.user = '1';
        expect(MessageSeer.sawMessage(message)).toBe(true);
      });
    });

    describe('and the message doesn\'t belong to me', function () {
      it('should consider the message seen', function () {
        message.user = '2';
        expect(MessageSeer.sawMessage(message)).toBe(true);
      });
    });
  });

  describe('when the document is not in focus', function () {
    beforeEach(function () {
      $window.document.hasFocus = function () { return false; };
    });

    describe('and the message belongs to me', function () {
      it('should consider the message seen', function () {
        message.user = '1';
        expect(MessageSeer.sawMessage(message)).toBe(true);
      });
    });

    describe('and the message doesn\'t belong to me', function () {
      it('should consider the message not seen', function () {
        message.user = '2';
        expect(MessageSeer.sawMessage(message)).toBe(false);
      });
    });
  });
});
