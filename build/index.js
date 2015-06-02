'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaConditionalGet = require('koa-conditional-get');

var _koaConditionalGet2 = _interopRequireDefault(_koaConditionalGet);

var _koaEtag = require('koa-etag');

var _koaEtag2 = _interopRequireDefault(_koaEtag);

var _koaGzip = require('koa-gzip');

var _koaGzip2 = _interopRequireDefault(_koaGzip);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaRewrite = require('koa-rewrite');

var _koaRewrite2 = _interopRequireDefault(_koaRewrite);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _apiApi = require('./api/api');

var _apiApi2 = _interopRequireDefault(_apiApi);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _servePackage = require('./servePackage');

var _servePackage2 = _interopRequireDefault(_servePackage);

var _webServerServerSideRendering = require('./web/server/ServerSideRendering');

var ServerSideRendering = _interopRequireWildcard(_webServerServerSideRendering);

var app = (0, _koa2['default'])();
app.name = 'exp-host';
app.proxy = true;
app.experimental = true;

app.use((0, _koaLogger2['default'])());
app.use((0, _koaGzip2['default'])());

var endpointRouter = (0, _koaRouter2['default'])({ prefix: '/--' });
endpointRouter.use((0, _koaBody2['default'])());

endpointRouter.all('/api/:method/:jsonArgs', _apiApi2['default'].callMethod);
endpointRouter.get('/appetize', function* (next) {
  this.type = 'text/html';
  this.body = yield _fs2['default'].promise.readFile(_path2['default'].join(__dirname, '../appetize.html'), 'utf8');
});
endpointRouter.get('/feedback', require('./feedbackSubmit'));
endpointRouter.post('/feedback/submit', require('./feedbackSubmit'));
endpointRouter.get('/git-hash', function* (next) {
  this.type = 'text/plain';
  this.body = yield _child_process2['default'].promise.exec('git rev-parse HEAD');
});
endpointRouter.get('/to-exp/:url', function* (next) {
  this.status = 301;
  this.response.redirect(this.params.url);
  //this.body = "<script>window.location=" + JSON.stringify(this.params.url) + ";</script>";

  // TODO: Since Safari will pop up an alert asking the user to confirm the redirect,
  // we may want to show some web content that hints at what will happen (or maybe not?)
});

app.use(endpointRouter.routes());
app.use(endpointRouter.allowedMethods());

// TODO: Write middleware for the bundle router so it always responds in a way
// that RN handles well
var bundleRouter = (0, _koaRouter2['default'])();
bundleRouter.get('/@:username/:package?', _servePackage2['default']);
bundleRouter.get('/app/exponent', require('./browser').serveBrowserBundleAsync);
bundleRouter.get('/--/browser.bundle', require('./browser').serveBrowserBundleFromDatabaseAsync);
bundleRouter.get('/exponent', function* (next) {
  require('instapromise');
  var sourcePath = undefined;
  if (this.query.version === '2015-05-25') {
    sourcePath = '../home-2015-05-25.bundle.js';
  } else {
    sourcePath = '../home.bundle.js';
  }
  var source = yield _fs2['default'].promise.readFile(_path2['default'].join(__dirname, sourcePath), 'utf8');
  this.type = 'application/javascript';
  this.body = source;
});
bundleRouter.get('/rnplay/', require('./rnplay').form);
bundleRouter.get('/rnplay/:shortCode', require('./rnplay').route);
app.use(bundleRouter.routes());
app.use(bundleRouter.allowedMethods());

var siteRouter = (0, _koaRouter2['default'])();
siteRouter.use((0, _koaConditionalGet2['default'])());
siteRouter.use((0, _koaEtag2['default'])());

siteRouter.get('/\\.:shortcode', function* (next) {
  var shortUrl = require('./shortUrl');
  var shortcode = this.params.shortcode;

  var url = yield shortUrl.urlForCodeAsync(shortcode);
  console.log('Short URL for code', shortcode, 'points to URL', url);
  if (url) {
    // TODO: Switch this from a proxy to a redirect once the client
    // can handle redirects
    var body = yield shortUrl.urlProxyBodyAsync(url);
    this.type = 'application/javascript';
    this.body = body;
    //this.response.redirect(url);
  } else {
    this['throw'](404, 'No such short URL: .' + shortcode);
  }
  this.type = 'text/html';
  this.body = 'Short URL for code ' + shortcode;
});
siteRouter.get('/images/(.*)', (0, _koaRewrite2['default'])('/images/*', '$1'), (0, _koaStatic2['default'])('src/web/images'));
siteRouter.get('/assets/(.*)', (0, _koaRewrite2['default'])('/assets/*', '$1'), (0, _koaStatic2['default'])('build/web/assets'));
siteRouter.get('/(.*)', function* (next) {
  var reactMarkup = yield ServerSideRendering.renderPageAsync(this.url);
  this.body = reactMarkup;
  this.type = 'text/html';
});
app.use(siteRouter.routes());
app.use(siteRouter.allowedMethods());

if (require.main === module) {
  (function () {
    var port = _config2['default'].server.port;

    var server = app.listen(port, function () {
      var addr = server.address();
      var port = addr.port;
      var host = addr.address;
      console.log('Listening on http://' + host + ':' + port + ' using NODE_ENV=' + process.env.NODE_ENV);
    });
  })();
}

exports.app = app;

/*
build and serve static assets. want to support both development and production mode.

babel: build api server
webpack: build static assets with __DEV__ settable. maybe have output go to build/web/__DEV__?
koa: run koa server with NODE_ENV settable
config options:
  process.env.NODE_ENV
  __DEV__




use react hot loader / webpack dev server to serve static assets. support development and production mode.

babel: just use babel-node with koa's NODE_ENV settable
webpack: run webpack dev server with __DEV__ settable

*/
//# sourceMappingURL=sourcemaps/index.js.map