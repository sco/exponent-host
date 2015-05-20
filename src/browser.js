require('instapromise');

const fs = require('fs');
const path = require('path');
const request = require('request');

const AwaitLock = require('await-lock');

const BROWSER_BUNDLE_URLS = {
  1: 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true',
};

const BROWSER_BUNDLE_FILES = {
  1: 'exponent.bundle.js',
};

var bundleCache = {};
var bundleDownloadLocks = {};

export default function* serveBrowserBundleAsync() {
  let version = this.query.version || '1';
  this.body = yield loadBundleAsync(version);
  this.type = 'application/javascript';
}

async function loadBundleAsync(version) {
  if (bundleCache[version]) {
    return bundleCache[version];
  }

  if (process.env.NODE_ENV === 'production') {
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
