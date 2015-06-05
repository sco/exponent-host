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
    var err = new Error("Parsing EXPONENT_VERSIONS from bundle failed!: " + e.message);
    err.jsObjString = jsObjString;
  }
}

async function getExponentVersionsFromFileAsync(file) {
  var source = await fs.promise.readFile(file, 'utf8');
  return getExponentVersions(source);
}

async function _loadSnapshotAsync(opts) {
  opts = opts || {};
  opts = _.assign({
    host: 'localhost',
    port: 8081,
    dev: false,
    minify: true,
    protocol: 'http',
    path: 'exponent.includeRequire.runModule.bundle',
  }, opts);

  var bundleUrl = opts.protocol + '://' + opts.host + ':' + opts.port + '/' + opts.path + '?dev=' + !!opts.dev + '&minify=' + !!opts.minify;

  var response = await gotPromise.get(bundleUrl);
  return response.body;
}

async function getBrowserSnapshotAsync(opts) {
  var bundle = await _loadSnapshotAsync(opts);
  var versions = getExponentVersions(bundle);
  return {
    versions,
    bundle,
  };
}

async function _saveBrowserSnapshotAsync(snapshot) {
  var toInsert = _.clone(snapshot.versions);
  toInsert.bundle = snapshot.bundle;
  toInsert.snapshotTime = r.now();
  var uploadingUsername = await username.promise();
  toInsert.uploadedBy = uploadingUsername;
  return await r.db('exp_host').table('browserSnapshots').insert(toInsert);
}

async function takeBrowserSnapshotAsync(opts) {
  var snapshot = await getBrowserSnapshotAsync(opts);
  await _saveBrowserSnapshotAsync(snapshot);
  return snapshot;
}

module.exports = {
  getExponentVersions,
  getExponentVersionsFromFileAsync,
  getBrowserSnapshotAsync,
  takeBrowserSnapshotAsync,
  _saveBrowserSnapshotAsync,
  _loadSnapshotAsync,
};

if (require.main === module) {
  var opts = require('minimist')(process.argv.slice(2));
  takeBrowserSnapshotAsync(opts).then((result) => {
    if (result) {
      result.bundle = result.bundle.substr(0, 50) + '...';
      console.log(result);
      process.exit(0);
    }
  }, (err) => {
    console.error(err.stack || err);
    process.exit(err.code || -1);
  });
}
