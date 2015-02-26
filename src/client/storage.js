'use strict';

import _ from 'lodash';

const PREFIX = 'slipflow';

function instantiate(Ctr, data) {
  var instance = new Ctr();
  return _.assign(instance, data);
}

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

  create: function (ctr, key) {
    var raw = this.get(key);

    if (typeof raw !== 'object') {
      throw new Error('Cannot call create() on a non-object for key ' + key);
    }

    if (raw instanceof Array) {
      return raw.map(function (i) {
        return instantiate(ctr, i);
      });
    }

    return instantiate(ctr, raw);
  }
};
