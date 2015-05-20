'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = serveBrowserBundleAsync;

var loadBundleAsync = _asyncToGenerator(function* (version) {
  if (bundleCache[version]) {
    return bundleCache[version];
  }

  if (process.env.NODE_ENV === 'production') {
    var bundleFile = path.join(__dirname, '..', BROWSER_BUNDLE_FILES[version]);
    var bundle = yield fs.promise.readFile(bundleFile, 'utf8');
    bundleCache[version] = bundle;
    return bundleCache[version];
  }

  var bundleUrl = BROWSER_BUNDLE_URLS[version];
  if (!bundleUrl) {
    throw new Error(`No app bundle URL for version ${ version }`);
  }

  if (!bundleDownloadLocks[version]) {
    bundleDownloadLocks[version] = new AwaitLock();
  }

  var lock = bundleDownloadLocks[version];
  yield lock.acquireAsync();

  try {
    if (bundleCache[version]) {
      return bundleCache[version];
    }

    var response = yield request.promise(bundleUrl);
    if (response.statusCode === 200) {
      bundleCache[version] = response.body;
    }
    return bundleCache[version];
  } finally {
    lock.release();
  }
});

require('instapromise');

const fs = require('fs');
const path = require('path');
const request = require('request');

const AwaitLock = require('await-lock');

const BROWSER_BUNDLE_URLS = {
  1: 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true' };

const BROWSER_BUNDLE_FILES = {
  1: 'exponent.bundle.js' };

var bundleCache = {};
var bundleDownloadLocks = {};

function* serveBrowserBundleAsync() {
  var version = this.query.version || '1';
  this.body = yield loadBundleAsync(version);
  this.type = 'application/javascript';
}

module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/browser.js.map