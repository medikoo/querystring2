'use strict';

var isArray = Array.isArray;

var stringifyPrimitive = function (v) {
  switch (typeof v) {
  case 'string':
    return v;
  case 'boolean':
    return v ? 'true' : 'false';
  case 'number':
    return isFinite(v) ? v : '';
  default:
    return '';
  }
};

module.exports = function (obj/*, sep, eq*/) {
  var sep = arguments[1] || '&';
  var eq = arguments[2] || '=';

  if (!obj || ((typeof obj !== 'function') && (typeof obj !== 'object'))) {
    throw new TypeError(obj + " is not an object");
  }

  var keys = Object.keys(obj);
  var fields = [];
  var i, k, v, ks, j;

  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    v = obj[k];
    ks = encodeURIComponent(k) + eq;

    if (isArray(v)) {
      for (j = 0; j < v.length; j++) fields.push(ks + encodeURIComponent(stringifyPrimitive(v[j])));
    } else {
      fields.push(ks + encodeURIComponent(stringifyPrimitive(v)));
    }
  }
  return fields.join(sep);
};
