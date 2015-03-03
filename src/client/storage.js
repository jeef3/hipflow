'use strict';

const PREFIX = 'slipflow';

export default {
  get: function (key) {
    var value = localStorage.getItem(`${PREFIX}.${key}`);

    if (!value) { return null; }

    return JSON.parse(value);
  },

  set: function (key, value) {
    var store = JSON.stringify(value);
    localStorage.setItem(`${PREFIX}.${key}`, store);
  },

  create: function (Ctr, key) {
    var raw = this.get(key);

    if (typeof raw !== 'object') {
      throw new Error('Cannot call create() on a non-object for key ' + key);
    }

    if (raw instanceof Array) {
      return raw.map((i) => {
        return new Ctr(i);
      });
    }

    return new Ctr(raw);
  }
};
