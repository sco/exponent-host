'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports.serveBrowserBundleAsync = serveBrowserBundleAsync;

var fetchBrowserBundleAsync = _asyncToGenerator(function* (opts) {
  opts = opts || {};
  var f = {};
  for (var key of ['exponentVersion', 'exponentGitHash', 'reactNativeVersion', 'reactNativeGitHash', 'dev', 'minify', 'key']) {
    if (opts.hasOwnProperty(key)) {
      var val = opts[key];
      if (val === 'true') {
        val = true;
      }
      if (val === 'false') {
        val = false;
      }
      f[key] = val;
    }
  }
  var result = yield r.db('exp_host').table('browserBundles').filter(f, { 'default': true }).orderBy(r.desc('minify'), r.asc('dev'), r.desc('reactNativeVersion'), r.desc('exponentVersion'), r.desc('uploadTime')).limit(1);

  return result[0] || null;
});

exports.fetchBrowserBundleAsync = fetchBrowserBundleAsync;
exports.serveBrowserBundleFromDatabaseAsync = serveBrowserBundleFromDatabaseAsync;

var loadBundleAsync = _asyncToGenerator(function* (version, reactNativeCommit) {
  if (process.env.NODE_ENV === 'production') {
    version += ':' + (reactNativeCommit || '');
  }

  if (bundleCache[version]) {
    return bundleCache[version];
  }

  if (process.env.NODE_ENV === 'production') {
    if (!BROWSER_BUNDLE_FILES[version]) {
      var numericVersion = /(\d+):/.exec(version)[1];
      var _bundleFile = path.join(__dirname, '..', BROWSER_BUNDLE_FILES[numericVersion]);
      return fs.promise.readFile(_bundleFile, 'utf8');
    }

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

const r = require('./database/r');

const BROWSER_BUNDLE_URLS = {
  1: 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true' };

const BROWSER_BUNDLE_FILES = {
  '1:': 'exponent-2015-05-25.bundle.js',
  '1:e8791bd94f1f2052572e755b8d7b29f29a6d99f3': 'exponent.bundle.js',
  1: 'exponent.bundle.js' };

var bundleCache = {};
var bundleDownloadLocks = {};

function* serveBrowserBundleAsync() {
  var version = this.query.version || '1';
  var reactNativeCommit = this.query.reactNativeGitHash;
  this.body = yield loadBundleAsync(version, reactNativeCommit);
  this.type = 'application/javascript';
}

function* serveBrowserBundleFromDatabaseAsync() {
  var bundle = yield fetchBrowserBundleAsync(this.query);
  if (bundle) {
    this.body = bundle.bundle;
    this.type = 'application/javascript';
  } else {
    this.type = 'text/plain';
    this['throw'](404, 'No bundle matching your query\'s description is available');
  }
}
//# sourceMappingURL=sourcemaps/browser.js.map