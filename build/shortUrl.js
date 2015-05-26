'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var urlForCodeAsync = _asyncToGenerator(function* (code) {
  var result = yield r.db('exp_host').table('shortenedUrls').filter({ code: code });
  if (result.length > 0) {
    return result[0].url;
  } else {
    return null;
  }
});

var r = require('./database/r');

function codeToUrl(code) {
  var protocol = arguments[1] === undefined ? 'exp' : arguments[1];

  return protocol + '://exp.host/.' + code;
}

module.exports = {
  codeToUrl: codeToUrl,
  urlForCodeAsync: urlForCodeAsync };
//# sourceMappingURL=sourcemaps/shortUrl.js.map