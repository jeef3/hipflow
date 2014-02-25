'use strict';

describe('Service: FlowdockMessage', function () {

  // load the service's module
  beforeEach(module('hipFlowApp'));

  // instantiate service
  var FlowdockMessage,
    FlowdockData;
  beforeEach(inject(function (_FlowdockMessage_, _FlowdockData_) {
    FlowdockMessage = _FlowdockMessage_;
    FlowdockData = _FlowdockData_;

    FlowdockData.chatLogs['ac44640e-c3cb-4fab-9b92-672c90e51a82'] = [];
    FlowdockData.chatLogs['ac44640e-c3cb-4fab-9b92-672c90e51a82'].push({
      app: 'influx',
      attachments: [],
      content: 'This is a normal message :smile:',
      event: 'message',
      flow: 'ac44640e-c3cb-4fab-9b92-672c90e51a82',
      id: 32594,
      sent: 1393316867967,
      tags: [],
      user: '58790',
      uuid: null
    });
  }));

  describe('addOrUpdate()', function () {

    describe('given a new message', function () {
      it('should add the message to the room', function () {

      });
    });
  });

  describe('edit()', function () {
    var messageEdit;

    beforeEach(function () {
      messageEdit = {
        event: 'message-edit',
        content: {
          message: 32594,
          'updated_content': 'An edited message'
        },
        flow: 'ac44640e-c3cb-4fab-9b92-672c90e51a82'
      };
    });

    it('should update the message content', function () {
      FlowdockMessage.edit(messageEdit);

      var edited = FlowdockMessage.get('ac44640e-c3cb-4fab-9b92-672c90e51a82', 32594);
      expect(edited.content).toBe('An edited message');
    });

    describe('when the message is not in the chat cache', function () {
      it('should do nothing', function () {
        messageEdit.content.message = 666;
        FlowdockMessage.edit(messageEdit);

        var original = FlowdockMessage.get('ac44640e-c3cb-4fab-9b92-672c90e51a82', 32594);
        expect(original.content).toBe('This is a normal message :smile:');
      });
    });

    describe('when the event is not message-edit', function () {
      it('should not alter the message', function () {
        messageEdit.event = 'message';
        expect(function () {
          FlowdockMessage.edit(messageEdit);
        }).toThrow('Expected event "message-edit" but found "message"');

        var edited = FlowdockMessage.get('ac44640e-c3cb-4fab-9b92-672c90e51a82', 32594);
        expect(edited.content).toBe('This is a normal message :smile:');
      });
    });
  });

});
