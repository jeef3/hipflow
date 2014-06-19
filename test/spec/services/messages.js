'use strict';

describe('Service: Messages', function () {

  // load the service's module
  beforeEach(module('slipflowApp'));

  // instantiate service
  var Messages,
    flow;

  beforeEach(inject(function (_Messages_) {
    Messages = _Messages_;

    flow = 'ac44640e-c3cb-4fab-9b92-672c90e51a82';

    Messages.messages[flow] = [];
    Messages.messages[flow].push({
      app: 'influx',
      attachments: [],
      content: 'This is a normal message :smile:',
      event: 'message',
      flow: flow,
      id: 32594,
      sent: 1393316867967,
      tags: [':unread:58806'],
      user: '58790',
      uuid: 'client-side-uuid-1'
    });
    Messages.messages[flow].push({
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
        Messages.addOrUpdate(newMessage, true);

        var newlyAdded = Messages.get(newMessage.uuid, flow);
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
        Messages.addOrUpdate(existingMessage);

        var updated = Messages.get(existingMessage.id, flow);
        expect(updated).not.toBe(existingMessage);
        expect(updated.content).toBe('This is a new message that has just saved');
        expect(updated.id).toBe(32596);
      });
    });

    describe('given a new server-side message', function () {
      var newMessage;

      beforeEach(function () {
        newMessage = {
          app: 'influx',
          attachments: [],
          content: 'Someone else sent this',
          event: 'message',
          flow: flow,
          id: 32595,
          tags: [],
          user: '58791',
          sent: 129331687967
        };

        Messages.addOrUpdate(newMessage);
      });

      it('should add the mesage to the room', function () {
        var newlyAdded = Messages.get(newMessage.id, flow);
        expect(newlyAdded).toBe(newMessage);
      });

      it('should keep the messages sorted by sent time', function () {
        expect(Messages.messages[flow][Messages.messages[flow].length - 1]).toBe(newMessage);
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

    describe('message-edit', function () {
      it('should update the message content', function () {
        Messages.edit(messageEdit);

        var edited = Messages.get(32594, flow);
        expect(edited.content).toBe('An edited message');
      });
    });

    describe('tag-change', function () {
      it('should update the tags', function () {
        var tagChange = {
          content: {
            add: [':thread:', ':something:'],
            message: 32594,
            remove: [':unread:58806']
          },
          event: 'tag-change',
          flow: flow,
          id: 45135,
          sent: 1394309922272,
          tags: [],
          user: '58806',
          uuid: null
        };
        Messages.edit(tagChange);

        var tagChanged = Messages.get(32594, flow);
        expect(tagChanged.tags.length).toBe(2);

        // Add
        expect(tagChanged.tags.indexOf(':thread:')).not.toBe(-1);
        expect(tagChanged.tags.indexOf(':something:')).not.toBe(-1);

        // Remove
        expect(tagChanged.tags.indexOf(':unread:58806')).toBe(-1);
      });
    });


    describe('when the message is not in the chat cache', function () {
      it('should do nothing', function () {
        messageEdit.content.message = 666;
        Messages.edit(messageEdit);

        var original = Messages.get(32594, flow);
        expect(original.content).toBe('This is a normal message :smile:');
      });
    });
  });

  describe('get()', function () {
    describe('given a valid message and room ID', function () {
      it('should return the message', function () {
        var got = Messages.get(32594, flow);
        expect(got).toBe(Messages.messages[flow][0]);
      });
    });

    describe('given a valid UUID and room ID', function () {
      it('should return the message', function () {
        var got = Messages.get('client-side-uuid-1', flow);
        expect(got).toBe(Messages.messages[flow][0]);
      });
    });

    describe('given an empty or invalid messageId', function () {
      it('should return null', function () {
        expect(Messages.get(0, flow)).toBeNull();
      });
    });

    describe('given an empty or invalid roomId', function () {
      it('should return null', function () {
        expect(Messages.get(32596, '')).toBeNull();
      });
    });
  });
});
