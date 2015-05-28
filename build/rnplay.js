'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var dataAsync = _asyncToGenerator(function* (playUrl) {
  try {
    var response = yield request.promise.get(playUrl);
  } catch (e) {
    throw RNPlayError(e.message);
  }

  var body = response.body;
  var $ = cheerio.load(body);
  var data = $('div[data-react-class=EditorApp]').data('reactProps');
  if (data) {
    return data;
  } else {
    throw RNPlayError('Failed to load data for Play');
  }
});

var expUrlFromShortCodeAsync = _asyncToGenerator(function* (shortCode) {
  var rnplayUrl = rnplayUrlFromShortCode(shortCode);
  var data = yield dataAsync(rnplayUrl);
  var expUrl = expUrlFromData(data);
  return expUrl;
});

var expUrlFromPlayUrlAsync = _asyncToGenerator(function* (playUrl) {
  var data = yield dataAsync(playUrl);
  var expUrl = expUrlFromData(data);
  return expUrl;
});

var _ = require('lodash-node');
var cheerio = require('cheerio');
var instapromise = require('instapromise');
var request = require('request');
var url = require('url');
var querystring = require('querystring');

function RNPlayError(message) {
  var err = new Error('RNPlayError: ' + message);
  err._isRNPlayError = true;
  return err;
}

;

function expUrlFromData(data) {
  var appetizeUrl = data.play.appetizeUrl;
  var u = url.parse(appetizeUrl);
  var q = querystring.parse(u.query);
  var p = JSON.parse(q.params);
  var bundleUrl = p.bundleUrl;
  var moduleName = p.moduleName;
  var expUrl = bundleUrl.replace(/https?:\/\//, 'exp://') + '?app=' + encodeURIComponent(moduleName);
  return expUrl;
}

function rnplayUrlFromShortCode(shortCode) {
  return 'https://rnplay.org/plays/' + shortCode;
}

var route = function* route(next) {
  try {
    var expUrl = yield expUrlFromShortCodeAsync(this.params.shortCode);
  } catch (e) {
    this.status = 302;
    this.response.redirect('/rnplay/?err=' + encodeURIComponent(e.message));
    yield next;
    return;
  }

  console.log('Redirecting to', expUrl);
  this.body = `
<html>
  <head>
    <title>Get Exponent to View This Play</title>
  </head>
  <body>
    You don't seem to have Exponent on your device, so you can't view this Play right now. Get Exponent at <a href="http://exp.host/">http://exp.host/</a> and come back here to view the Play!
  </body>
</html>
`;

  // Since the module name could change, we should use a 302 here
  this.status = 302;

  this.response.redirect(expUrl);
};

var form = function* form(next) {

  var html = `
<html>
<head>
  <title>View an RNPlay in Exponent</title>
</head>
<body>
`;

  var err = this.query.err;
  if (err) {
    html += '<div style="color: red; font-weight: bold;">' + err + '</div>';
  }

  html += `
    <form method="GET" onsubmit="window.location='/rnplay/' + document.getElementById('rnplay').value; return false;">
      <input type="text" value="" id="rnplay" name="shortCodeOrUrl" />
      <input type="submit" value=" Go " />
    </form>
  </body>
</html>
  `;

  this.body = html;
};

module.exports = {
  dataAsync: dataAsync,
  expUrlFromShortCodeAsync: expUrlFromShortCodeAsync,
  rnplayUrlFromShortCode: rnplayUrlFromShortCode,
  expUrlFromData: expUrlFromData,
  route: route,
  form: form };

if (require.main === module) {
  var urlOrShortCode = process.argv[2];
  var playUrl;
  if (urlOrShortCode.match(/\//)) {
    playUrl = urlOrShortCode;
  } else {
    playUrl = rnplayUrlFromShortCode(urlOrShortCode);
  }
  console.error('Play URL:', playUrl);
  expUrlFromPlayUrlAsync(playUrl).then(function (expUrl) {
    console.log(expUrl);
  }, console.error);
}
//# sourceMappingURL=sourcemaps/rnplay.js.map