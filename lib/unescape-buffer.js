'use strict';

var charCode = function (c) { return c.charCodeAt(0); };

// a safe fast alternative to decodeURIComponent
module.exports = function (s) {
  var out = new Array(s.length);
  var state = 'CHAR'; // states: CHAR, HEX0, HEX1
  var n, m, hexchar, inIndex, outIndex, c;
  for (inIndex = 0, outIndex = 0; inIndex <= s.length; inIndex++) {
    c = s.charCodeAt(inIndex);
    switch (state) {
    case 'CHAR':
      switch (c) {
      case charCode('%'):
        n = 0;
        m = 0;
        state = 'HEX0';
        break;
      default:
        out[outIndex++] = c;
        break;
      }
      break;
    case 'HEX0':
      state = 'HEX1';
      hexchar = c;
      if (charCode('0') <= c && c <= charCode('9')) {
        n = c - charCode('0');
      } else if (charCode('a') <= c && c <= charCode('f')) {
        n = c - charCode('a') + 10;
      } else if (charCode('A') <= c && c <= charCode('F')) {
        n = c - charCode('A') + 10;
      } else {
        out[outIndex++] = charCode('%');
        out[outIndex++] = c;
        state = 'CHAR';
        break;
      }
      break;
    case 'HEX1':
      state = 'CHAR';
      if (charCode('0') <= c && c <= charCode('9')) {
        m = c - charCode('0');
      } else if (charCode('a') <= c && c <= charCode('f')) {
        m = c - charCode('a') + 10;
      } else if (charCode('A') <= c && c <= charCode('F')) {
        m = c - charCode('A') + 10;
      } else {
        out[outIndex++] = charCode('%');
        out[outIndex++] = hexchar;
        out[outIndex++] = c;
        break;
      }
      out[outIndex++] = 16 * n + m;
      break;
    }
  }
  return out.slice(0, outIndex - 1);
};
