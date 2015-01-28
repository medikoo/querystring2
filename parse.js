'use strict';

var unescapeBuffer = require('./lib/unescape-buffer')

  , isArray = Array.isArray
  , hasOwnProperty = Object.prototype.hasOwnProperty, create = Object.create
  , fromCharCode = String.fromCharCode
  , regexp = /\+/g;

var decode = function (s) {
  try {
    return decodeURIComponent(s);
  } catch (e) { return fromCharCode.apply(null, unescapeBuffer(s)); }
};

module.exports = function (qs/*, sep, eq, options*/) {
  var sep = arguments[1] || '&';
  var eq = arguments[2] || '=';
  var options = arguments[3];
  var obj = create(null), i, x, idx, kstr, vstr, k, v;

  if (qs == null) return obj;
  qs = String(qs);

  if (qs.length === 0) {
    return obj;
  }

  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && !isNaN(options.maxKeys)) {
    maxKeys = Number(options.maxKeys);
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (i = 0; i < len; ++i) {
    x = qs[i].replace(regexp, '%20');
    idx = x.indexOf(eq);

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decode(kstr);
    v = decode(vstr);

    if (!hasOwnProperty.call(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};
