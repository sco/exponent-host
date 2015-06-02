require('instapromise');

const fs = require('fs');
const path = require('path');
const request = require('request');

const AwaitLock = require('await-lock');

const r = require('./database/r');

const BROWSER_BUNDLE_URLS = {
  1: 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true',
};

const BROWSER_BUNDLE_FILES = {
  '1:': 'exponent-2015-05-25.bundle.js',
  '1:e8791bd94f1f2052572e755b8d7b29f29a6d99f3': 'exponent.bundle.js',
  1: 'exponent.bundle.js',
};

var bundleCache = {};
var bundleDownloadLocks = {};

export function* serveBrowserBundleAsync() {
  let version = this.query.version || '1';
  let reactNativeCommit = this.query.reactNativeGitHash;
  this.body = yield loadBundleAsync(version, reactNativeCommit);
  this.type = 'application/javascript';
}

export async function fetchBrowserBundleAsync(opts) {
  opts = opts || {};
  let f = {};
  for (let key of [
    'exponentVersion',
    'exponentGitHash',
    'reactNativeVersion',
    'reactNativeGitHash',
    'dev',
    'minify',
    'key',
  ]) {
    if (opts.hasOwnProperty(key)) {
      f[key] = opts[key];
    }
  }
  let result = await r
    .db('exp_host')
    .table('browserBundles')
    .filter(f, {default: true})
    .orderBy(
      r.desc('minify'),
      r.asc('dev'),
      r.desc('reactNativeVersion'),
      r.desc('exponentVersion'),
      r.desc('uploadTime')
    )
    .limit(1)
    ;

  return result[0] || null;

}

export function* serveBrowserBundleFromDatabaseAsync() {
  let bundle = yield fetchBrowserBundleAsync(this.query);
  if (bundle) {
    this.body = bundle.bundle;
    this.type = 'application/javascript';
  } else {
    this.type = 'text/plain';
    this.throw(404, "No bundle matching your query's description is available");
  }
}


async function loadBundleAsync(version, reactNativeCommit) {
  if (process.env.NODE_ENV === 'production') {
    version += ':' + (reactNativeCommit || '');
  }

  if (bundleCache[version]) {
    return bundleCache[version];
  }

  if (process.env.NODE_ENV === 'production') {
    if (!BROWSER_BUNDLE_FILES[version]) {
      let numericVersion = /(\d+):/.exec(version)[1];
      let bundleFile = path.join(__dirname, '..', BROWSER_BUNDLE_FILES[numericVersion]);
      return fs.promise.readFile(bundleFile, 'utf8');
    }

    let bundleFile = path.join(__dirname, '..', BROWSER_BUNDLE_FILES[version]);
    let bundle = await fs.promise.readFile(bundleFile, 'utf8');
    bundleCache[version] = bundle;
    return bundleCache[version];
  }

  let bundleUrl = BROWSER_BUNDLE_URLS[version];
  if (!bundleUrl) {
    throw new Error(`No app bundle URL for version ${version}`);
  }

  if (!bundleDownloadLocks[version]) {
    bundleDownloadLocks[version] = new AwaitLock();
  }

  var lock = bundleDownloadLocks[version];
  await lock.acquireAsync();

  try {
    if (bundleCache[version]) {
      return bundleCache[version];
    }

    let response = await request.promise(bundleUrl);
    if (response.statusCode === 200) {
      bundleCache[version] = response.body;
    }
    return bundleCache[version];
  } finally {
    lock.release();
  }
}
