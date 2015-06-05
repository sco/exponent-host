'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var getExponentVersionsFromFileAsync = _asyncToGenerator(function* (file) {
  var source = yield fs.promise.readFile(file, 'utf8');
  return getExponentVersions(source);
});

var _loadSnapshotAsync = _asyncToGenerator(function* (opts) {
  opts = opts || {};
  opts = _.assign({
    host: 'localhost',
    port: 8081,
    dev: false,
    minify: true,
    protocol: 'http',
    path: 'exponent.includeRequire.runModule.bundle' }, opts);

  var bundleUrl = opts.protocol + '://' + opts.host + ':' + opts.port + '/' + opts.path + '?dev=' + !!opts.dev + '&minify=' + !!opts.minify;

  var response = yield gotPromise.get(bundleUrl);
  return response.body;
});

var getBrowserSnapshotAsync = _asyncToGenerator(function* (opts) {
  var bundle = yield _loadSnapshotAsync(opts);
  var versions = getExponentVersions(bundle);
  return {
    versions: versions,
    bundle: bundle };
});

var _saveBrowserSnapshotAsync = _asyncToGenerator(function* (snapshot) {
  var toInsert = _.clone(snapshot.versions);
  toInsert.bundle = snapshot.bundle;
  toInsert.snapshotTime = r.now();
  var uploadingUsername = yield username.promise();
  toInsert.uploadedBy = uploadingUsername;
  return yield r.db('exp_host').table('browserSnapshots').insert(toInsert);
});

var takeBrowserSnapshotAsync = _asyncToGenerator(function* (opts) {
  var snapshot = yield getBrowserSnapshotAsync(opts);
  yield _saveBrowserSnapshotAsync(snapshot);
  return snapshot;
});

var _ = require('lodash-node');
var fs = require('fs');
var gotPromise = require('got-promise');
var instapromise = require('instapromise');
var username = require('username');

var r = require('./database/r');

function getExponentVersions(source) {
  var jsObjString = source.match(/(\$\$\$___EXPONENT_VERSIONS___\$\$\$\s*=\s*({[^}]*}))/m)[2];
  try {
    return JSON.parse(jsObjString);
  } catch (e) {
    var err = new Error('Parsing EXPONENT_VERSIONS from bundle failed!: ' + e.message);
    err.jsObjString = jsObjString;
  }
}

module.exports = {
  getExponentVersions: getExponentVersions,
  getExponentVersionsFromFileAsync: getExponentVersionsFromFileAsync,
  getBrowserSnapshotAsync: getBrowserSnapshotAsync,
  takeBrowserSnapshotAsync: takeBrowserSnapshotAsync,
  _saveBrowserSnapshotAsync: _saveBrowserSnapshotAsync,
  _loadSnapshotAsync: _loadSnapshotAsync };

if (require.main === module) {
  var opts = require('minimist')(process.argv.slice(2));
  takeBrowserSnapshotAsync(opts).then(function (result) {
    if (result) {
      result.bundle = result.bundle.substr(0, 50) + '...';
      console.log(result);
      process.exit(0);
    }
  }, function (err) {
    console.error(err.stack || err);
    process.exit(err.code || -1);
  });
}
//# sourceMappingURL=sourcemaps/snapshots.js.map