'use strict';

var prefix = 'slipflow';

var storage = {
  get: function (key) {
    var value = localStorage.getItem(prefix + key);

    if (!value) { return null; }

    return JSON.parse(value);
  },

  set: function (key, value) {
    var store = JSON.stringify(value);
    localStorage.setItem(key, store);
  },

  create: function (proto, key) {
    var raw = this.get(key);

    if (typeof raw !== 'object') {
      throw new Error('Cannot call create() on a non-object for key ' + key);
    }

    if (raw instanceof Array) {
      return raw.map(function (i) {
        return Object.create(proto, i);
      });
    }

    return Object.create(proto, raw);
  }
};

export {storage};
