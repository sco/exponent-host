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

var urlProxyBodyAsync = _asyncToGenerator(function* (url) {
  var httpUrl = url.replace(/^exp:/, 'http:');
  var response = yield request.promise.get(url);
  console.log('response=', response);
  var body = response.body;
  return body;
});

var instapromise = require('instapromise');
var request = require('request');

var r = require('./database/r');

function codeToUrl(code) {
  var protocol = arguments[1] === undefined ? 'exp' : arguments[1];

  return protocol + '://exp.host/.' + code;
}

module.exports = {
  codeToUrl: codeToUrl,
  urlForCodeAsync: urlForCodeAsync,
  urlProxyBodyAsync: urlProxyBodyAsync };
//# sourceMappingURL=sourcemaps/shortUrl.js.map