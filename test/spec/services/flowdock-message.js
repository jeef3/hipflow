'use strict';

describe('Service: FlowdockMessage', function () {

  // load the service's module
  beforeEach(module('hipFlowApp'));

  // instantiate service
  var FlowdockMessage,
    FlowdockData,
    flow;

  beforeEach(inject(function (_FlowdockMessage_, _FlowdockData_) {
    FlowdockMessage = _FlowdockMessage_;
    FlowdockData = _FlowdockData_;

    flow = 'ac44640e-c3cb-4fab-9b92-672c90e51a82';

    FlowdockData.chatLogs[flow] = [];
    FlowdockData.chatLogs[flow].push({
      app: 'influx',
      attachments: [],
      content: 'This is a normal message :smile:',
      event: 'message',
      flow: flow,
      id: 32594,
      sent: 1393316867967,
      tags: [],
      user: '58790',
      uuid: 'client-side-uuid-1'
    });
    FlowdockData.chatLogs[flow].push({
      app: 'influx',
      attachments: [],
      content: 'This is a message that hasn\'t been saved yet',
      event: 'message',
      flow: flow,
      tags: [],
      user: '58790',
      uuid: 'client-side-uuid-2'
    });
  }));

  describe('addOrUpdate()', function () {
    describe('given a new client-side message', function () {
      var newMessage;

      beforeEach(function () {
        newMessage = {
          app: 'influx',
          attachments: [],
          content: 'This is a new message that was just sent',
          event: 'message',
          flow: flow,
          tags: [],
          user: '58790',
          uuid: 'client-side-uuid-3'
        };
      });

      it('should add the message to the room', function () {
        FlowdockMessage.addOrUpdate(newMessage, true);

        var newlyAdded = FlowdockMessage.get(newMessage.uuid, flow);
        expect(newlyAdded).toBe(newMessage);
      });
    });

    describe('given a newly saved message', function () {
      var existingMessage;

      beforeEach(function () {
        existingMessage = {
          app: 'influx',
          attachments: [],
          content: 'This is a new message that has just saved',
          event: 'message',
          flow: flow,
          id: 32596,
          sent: 1393316867967,
          tags: [],
          uuid: 'client-side-uuid-2' // Already exists
        };
      });

      it('should update the client-side message', function () {
        FlowdockMessage.addOrUpdate(existingMessage);

        var updated = FlowdockMessage.get(existingMessage.id, flow);
        expect(updated).not.toBe(existingMessage);
        expect(updated.content).toBe('This is a new message that has just saved');
        expect(updated.id).toBe(32596);
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
        flow: flow
      };
    });

    it('should update the message content', function () {
      FlowdockMessage.edit(messageEdit);

      var edited = FlowdockMessage.get(32594, flow);
      expect(edited.content).toBe('An edited message');
    });

    describe('when the message is not in the chat cache', function () {
      it('should do nothing', function () {
        messageEdit.content.message = 666;
        FlowdockMessage.edit(messageEdit);

        var original = FlowdockMessage.get(32594, flow);
        expect(original.content).toBe('This is a normal message :smile:');
      });
    });

    describe('when the event is not message-edit', function () {
      it('should not alter the message', function () {
        messageEdit.event = 'message';
        expect(function () {
          FlowdockMessage.edit(messageEdit);
        }).toThrow('Expected event "message-edit" but found "message"');

        var edited = FlowdockMessage.get(32594, flow);
        expect(edited.content).toBe('This is a normal message :smile:');
      });
    });
  });

  describe('get()', function () {
    describe('given a valid message and room ID', function () {
      it('should return the message', function () {
        var got = FlowdockMessage.get(32594, flow);
        expect(got).toBe(FlowdockData.chatLogs[flow][0]);
      });
    });

    describe('given a valid UUID and room ID', function () {
      it('should return the message', function () {
        var got = FlowdockMessage.get('client-side-uuid-1', flow);
        expect(got).toBe(FlowdockData.chatLogs[flow][0]);
      });
    });

    describe('given an empty or invalid messageId', function () {
      it('should return null', function () {
        expect(FlowdockMessage.get(0, flow)).toBeNull();
      });
    });

    describe('given an empty or invalid roomId', function () {
      it('should return null', function () {
        expect(FlowdockMessage.get(32596, '')).toBeNull();
      });
    });
  });
});
