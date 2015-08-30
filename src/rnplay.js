var _ = require('lodash');
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

async function dataAsync(playUrl) {
  try {
    var response = await request.promise.get(playUrl);
  } catch (e) {
    throw RNPlayError(e.message);
  }

  var body = response.body;
  var $ = cheerio.load(body);
  var data = $('div[data-react-class=EditorApp]').data('reactProps');
  if (data) {
    return data;
  } else {
    throw RNPlayError("Failed to load data for Play");
  }
};

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

async function expUrlFromShortCodeAsync(shortCode) {
  var rnplayUrl = rnplayUrlFromShortCode(shortCode);
  var data = await dataAsync(rnplayUrl);
  var expUrl = expUrlFromData(data);
  return expUrl;
}

async function expUrlFromPlayUrlAsync(playUrl) {
  var data = await dataAsync(playUrl);
  var expUrl = expUrlFromData(data);
  return expUrl;
}

var route = function *(next) {
  try {
    var expUrl = yield expUrlFromShortCodeAsync(this.params.shortCode);
  } catch (e) {
    this.status = 302;
    this.response.redirect('/rnplay/?err=' + encodeURIComponent(e.message));
    yield next;
    return;
  }

  console.log("Redirecting to", expUrl);
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

var form = function *(next) {

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
  dataAsync,
  expUrlFromShortCodeAsync,
  rnplayUrlFromShortCode,
  expUrlFromData,
  route,
  form,
};

if (require.main === module) {
  var urlOrShortCode = process.argv[2];
  var playUrl;
  if (urlOrShortCode.match(/\//)) {
    playUrl = urlOrShortCode;
  } else {
    playUrl = rnplayUrlFromShortCode(urlOrShortCode);
  }
  console.error("Play URL:", playUrl);
  expUrlFromPlayUrlAsync(playUrl).then((expUrl) => {
    console.log(expUrl);
  }, console.error);
}
