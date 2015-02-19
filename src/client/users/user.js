'use strict';

function User() {}

User.prototype.isOnline = function () {
  var now = new Date();
  var ping = this.last_ping || this.last_activity;
  var diff = now - ping;

  // Consider online if active within the last 5 minutes
  return diff < (1000 * 60 * 5);
};

User.prototype.isMe = function () {

};

export default User;
