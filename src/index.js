import child_process from 'child_process';
import fs from 'fs';
import path from 'path';

import koa from 'koa';
import body from 'koa-body';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import gzip from 'koa-gzip';
import logger from 'koa-logger';
import rewrite from 'koa-rewrite';
import router from 'koa-router';
import secret from '@exponent/secret';
import serve from 'koa-static';

import api from './api/api';
import config from './config';
import servePackage from './servePackage';

import ServerSideRenderer from './web/server/ServerSideRenderer';

let app = koa();
app.name = 'exp-host';
app.proxy = true;
app.experimental = true;

app.use(logger());
app.use(gzip());

let endpointRouter = router({ prefix: '/--' });
endpointRouter.use(body());

endpointRouter.all('/api/:method/:jsonArgs', api.callMethod);
endpointRouter.get('/appetize', function*(next) {
  this.type = 'text/html';
  this.body = yield fs.promise.readFile(path.join(__dirname, '../appetize.html'), 'utf8');
});
endpointRouter.get('/feedback', require('./feedbackSubmit'));
endpointRouter.post('/feedback/submit', require('./feedbackSubmit'));
endpointRouter.get('/git-hash', function*(next) {
  this.type = 'text/plain';
  this.body = yield child_process.promise.exec('git rev-parse HEAD');
});
endpointRouter.get('/to-exp/:url', function*(next) {
  this.status = 301;
  this.response.redirect(this.params.url);
  //this.body = "<script>window.location=" + JSON.stringify(this.params.url) + ";</script>";

  // TODO: Since Safari will pop up an alert asking the user to confirm the redirect,
  // we may want to show some web content that hints at what will happen (or maybe not?)
});
// endpointRouter.get('/dropbox-webhook', require('./dropbox').webhook);

app.use(endpointRouter.routes());
app.use(endpointRouter.allowedMethods());

// TODO: Write middleware for the bundle router so it always responds in a way
// that RN handles well
let bundleRouter = router();
bundleRouter.get('/@:username/:package?', servePackage);
bundleRouter.get('/app/exponent', require('./browser').serveBrowserBundleAsync);
bundleRouter.get('/--/browser.bundle', require('./browser').serveBrowserBundleFromDatabaseAsync);
bundleRouter.get('/exponent', function*(next) {
  require('instapromise');
  let sourcePath;
  if (this.query.version === '2015-05-25') {
    sourcePath = '../home-2015-05-25.bundle.js';
  } else {
    sourcePath = '../home.bundle.js';
  }
  let source = yield fs.promise.readFile(path.join(__dirname, sourcePath), 'utf8');
  this.type = 'application/javascript';
  this.body = source;
});
bundleRouter.get('/rnplay/', require('./rnplay').form);
bundleRouter.get('/rnplay/:shortCode', require('./rnplay').route);
app.use(bundleRouter.routes());
app.use(bundleRouter.allowedMethods());

let siteRouter = router();
siteRouter.use(conditional());
siteRouter.use(etag());

siteRouter.get('/\\.:shortcode', function*(next) {
  let shortUrl = require('./shortUrl');
  let { shortcode } = this.params;
  let url = yield shortUrl.urlForCodeAsync(shortcode);
  console.log('Short URL for code', shortcode, 'points to URL', url);
  if (url) {
    // TODO: Switch this from a proxy to a redirect once the client
    // can handle redirects
    var body = yield shortUrl.urlProxyBodyAsync(url);
    this.type = 'application/javascript';
    this.body = body;
    //this.response.redirect(url);
  } else {
    this.throw(404, 'No such short URL: .' + shortcode);
  }
  this.type = 'text/html';
  this.body = 'Short URL for code ' + shortcode;
});
siteRouter.get('/images/(.*)',
  rewrite('/images/*', '$1'),
  serve('src/web/browser/images'),
);
siteRouter.get('/assets/v(\\d+)/(.*)',
  rewrite('/assets/v\\d+/*', '$1'),
  serve('build/web/assets'),
);
siteRouter.get('/(.*)', function*(next) {
  let staticResources = require('./web/server/stats.json');
  let renderer = new ServerSideRenderer(this, staticResources);
  let reactMarkup = yield renderer.renderPageAsync(this.url);
  this.body = reactMarkup;
  this.type = 'text/html';
});
app.use(siteRouter.routes());
app.use(siteRouter.allowedMethods());

if (require.main === module) {
  let { port } = config.server;
  let server = app.listen(port, () => {
    let addr = server.address();
    let port = addr.port;
    let host = addr.address;
    console.log('Listening on http://' + host + ':' + port + ' using NODE_ENV=' + process.env.NODE_ENV);
  });
}

export { app };

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
