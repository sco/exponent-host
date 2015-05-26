var instapromise = require('instapromise');
var request = require('request');

var r = require('./database/r');

function codeToUrl(code, protocol='exp') {
  return protocol + "://exp.host/." + code;
}

async function urlForCodeAsync(code) {
  var result = await r.db('exp_host').table('shortenedUrls').filter({code});
  if (result.length > 0) {
    return result[0].url;
  } else {
    return null;
  }
}

async function urlProxyBodyAsync(url) {
  var httpUrl = url.replace(/^exp:/, 'http:');
  var response = await request.promise.get(httpUrl);
  var body = response.body;
  return body;
}

module.exports = {
  codeToUrl,
  urlForCodeAsync,
  urlProxyBodyAsync,
};
