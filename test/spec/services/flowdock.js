'use strict';

describe('Service: Flowdock', function () {

  // load the service's module
  beforeEach(module('hipflowApp'));

  // instantiate service
  var Flowdock;
  beforeEach(inject(function (_Flowdock_) {
    Flowdock = _Flowdock_;
  }));

  describe('flow', function () {

    it('should be able to list joined flows', function () {
      Flowdock.flows.list(function (flows) {
        expect(flows.length).toBe(5);
      });
    });

    it('should be able to list all flows', function () {
      Flowdock.flows.all(function (flows) {
        expect(flows.length).toBe(10);
      });
    });

    it('should be able to get a flow', function () {
      var id = 1;

      Flowdock.flows(id, function (flow) {
        expect(flow.id).toBe(id);
      });
    });

    it('should be able to create a flow', function () {
      var newFlow = {
        name: 'A new flow'
      };

      Flowdock.flows.create(newFlow, function (flow) {
        expect(flow.name).toBe(newFlow.name);
      });
    });

    it('should be able to update a flow', function () {
      var id = 1;
      var updated = {
        name: 'An updated flow'
      };

      Flowdock.flows(id).update(updated, function (flow) {
        expect(flow.id).toBe(id);
        expect(flow.name).toBe(updated.name);
      });
    });

    it('should be able to rename a flow', function () {
      var id = 1;
      var newName = 'New flow name';

      Flowdock.flows(id).rename(newName, function (flow) {
        expect(flow.name).toBe(newName);
      });
    });

    it('should be able to open a flow', function () {
      var id = 1;

      Flowdock.flows(id).open(function (flow) {
        expect(flow.open).toBeTrue();
      });
    });

    it('should be able to close a flow', function () {
      var id = 1;

      Flowdock.flows(id).close(function (flow) {
        expect(flow.open).toBeFalse();
      });
    });

    it('should be able to join a flow', function () {
      var id = 1;

      Flowdock.flows(id).join(function (flow) {
        expect(flow.joined).toBeTrue();
      });
    });

    it('should be able to leave a flow', function () {
      var id = 1;

      Flowdock.flows(id).leave(function (flow) {
        expect(flow.joined).toBeFalse();
      });
    });

    it('should be able to disable a flow', function () {
      var id = 1;

      Flowdock.flows(id).disable(function (flow) {
        expect(flow.open).toBeTrue();
      });
    });

    it('should be able to set the access of a flow', function () {
      var id = 1;

      Flowdock.flows(id).access('invitation', function (flow) {
        expect(flow.access_mode).toBe('invitation');
      });

      Flowdock.flows(id).access('organization', function (flow) {
        expect(flow.access_mode).toBe('organization');
      });

      Flowdock.flows(id).access('link', function (flow) {
        expect(flow.access_mode).toBe('link');
      });

      expect(function () {
        Flowdock.flows(id).access('illegal');
      }).toThrow('\'illegal\' is an invalid access type. Please choose from; invitation, link, organization.');
    });
  });

  describe('stream', function () {

    it('should be able to listen to a flow', function () {
      var id = 1;
      var stream = Flowdock.stream(id);

      stream.onmessage = function (message) {
        expect(message).toBeTruthy();
      };
    });

    it('should be able to listen to multiple flows', function () {
      var flows = [
        {
          parameterized_name: 'flow_one',
          organization: {
            parameterized_name: 'org_one'
          }
        },
        {
          parameterized_name: 'flow_two',
          organization: {
            parameterized_name: 'org_one'
          }
        }
      ];
      var stream = Flowdock.stream(flows);

      stream.onmessage = function (message) {
        expect(message).toBeTruthy();
      };
    });

    it('should be able to listen to private messages', function () {
      var id = 1;
      var stream = Flowdock.stream(id, { user: 1 });

      stream.onmessage = function (message) {
        expect(message).toBeTruthy();
      };
    });

    it('should be able to set online status', function () {
      var id = 1;
      var stream = Flowdock.stream(id, { active: 'true' });

      stream.onmessage = function (message) {
        expect(message).toBeTruthy();
      };
    });
  });
});
