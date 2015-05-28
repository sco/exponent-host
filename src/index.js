var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

var koa = require('koa');
var body = require('koa-body');
var gzip = require('koa-gzip');
var logger = require('koa-logger');
var router = require('koa-router');

var api = require('./api/api');
var config = require('./config');
var servePackage = require('./servePackage');

var PORT = config.server.port || 3000;

var app = koa();
app.name = 'exp-host';
app.proxy = true;
app.experimental = true;

app.use(logger());
app.use(gzip());

// URL scheme
// /-/something is for user facing URLs, ex. support, privacy
// /--/something is for behind the scenes URLs, like API endpoints, etc.
// /@username is a user's space
//
// This is desgined to preserve flexibility for anything else we want to do with the space of URLs

var siteRouter = router();

siteRouter.get('/--/git-hash', function*(next) {
  this.type = 'text/plain';
  this.body = yield child_process.promise.exec('git rev-parse HEAD');
});


siteRouter.get('/', function*(next) {
  var manifestUrl = 'https://www.dropbox.com/s/wjr7trh1zg12s6b/manifest.plist?dl=1';
  this.type = 'text/html';
  this.body = `
  <html>
    <head>
      <meta name="viewport" content="width=500">
      <title>E X P O N E N T ^</title>
      <style>
      BODY {
        color: white;
        background: #023c69;
        font-family: "HelveticaNeue-Light", Helvetica, Sans-serif;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
      }
      H1 {
        letter-spacing: 0.5em;
        font-weight: lighter;
      }
      a img { border: none; }
      .download {
        font-weight: bold;
        background: white;
        color: #333333;
        font-size: 18;
        padding-left: 24px;
        padding-right: 24px;
        border: 2px solid;
        border-color: #89a3bd;
        border-radius: 12px;
        margin-top: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
      }
      H3 {
        font-weight: normal;
      }
      H4 {
      }
      a { text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>EXPONENT</h1>
      <h3>Exponent is an app for React Native developers.</h3>
      <img src="http://cdc03.com/ExponentIcon@3x.png" />
      <p><center><div style="width: 400px; margin-bottom: 20px;">With Exponent, you can write React Native experiences with any computer and a text editor and a phone.
      No need for Xcode or a simulator. Download the app now to get started.</div><br /></center></p>

      <h3><a href="itms-services://?action=download-manifest&amp;url=${encodeURIComponent(manifestUrl)}"><span class="download" style="margin-top: 10px;">Download</span></a>

    </body>
  </html>
  `;
});

siteRouter.get('/-/support', function*(next) {
  this.body = "Contact Exponent at exponent.team@gmail.com";
});

siteRouter.get('/-/privacy', function*(next) {
  this.body = "We will not sell or give away your email.";
});

siteRouter.all('/--/api/:method/:jsonArgs', api.callMethod);

siteRouter.get('/app/exponent', require('./browser'));

siteRouter.get('/exponent', function*(next) {
  require('instapromise');
  let source = yield fs.promise.readFile(path.join(__dirname, '../home.bundle.js'), 'utf8');
  this.type = 'application/javascript';
  this.body = source;
});

siteRouter.get('/@:username/:pkg', servePackage);
siteRouter.get('/@:username', servePackage);
siteRouter.get('/@:username/', servePackage);

siteRouter.get('/--/to-exp/:url', function*(next) {
  this.status = 301;
  this.response.redirect(this.params.url);
  //this.body = "<script>window.location=" + JSON.stringify(this.params.url) + ";</script>";

  // TODO: Since Safari will pop up an alert asking the user to confirm the redirect,
  // we may want to show some web content that hints at what will happen (or maybe not?)
});

siteRouter.get('/rnplay/:shortCode', require('./rnplay').route);

siteRouter.get('/--/appetize', function*(next) {
  this.type = 'text/html';
  this.body = yield fs.promise.readFile(path.join(__dirname, '..', 'appetize.html'), 'utf8');
});

siteRouter.get('/--/feedback', require('./feedbackSubmit'));

siteRouter.post('/--/feedback/submit', require('./feedbackSubmit'));

app.use(body({formidable:{uploadDir: __dirname}}));
app.use(siteRouter.routes());
app.use(siteRouter.allowedMethods());

// Short URLs
siteRouter.get('/:dotcode', function*(next) {
  console.log("Handling short URL:", this.params.dotcode);
  var shortUrl = require('./shortUrl');
  var dotCode = this.params.dotcode;
  if (dotCode[0] === '.') {
    var code = dotCode.slice(1);
    var url = yield shortUrl.urlForCodeAsync(code);
    console.log("Short URL for code", code, "points to URL", url);
    if (url) {
      // TODO: Switch this from a proxy to a redirect once the client
      // can handle redirects
      var body = yield shortUrl.urlProxyBodyAsync(url);
      this.type = 'application/javascript';
      this.body = body;
      //this.response.redirect(url);
    } else {
      this.throw(404, "No such short URL: " + code);
    }
  } else {
    yield next;
  }
});


if (require.main === module) {
  var port = PORT;
  var server = app.listen(port, function () {
    var addr = server.address();
    var port = addr.port;
    var host = addr.address;
    console.log("Listening on http://" + host + ":" + port + " using NODE_ENV=" + process.env.NODE_ENV);
  });
}
