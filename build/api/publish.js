'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var instapromise = require('instapromise');
var md5hex = require('@exponent/md5hex');
var request = require('request');

var ApiError = require('./ApiError');
var config = require('../config');
var r = require('../database/r');

module.exports = {
  doc: 'Publishes a a package to exp.host',
  methodAsync: _asyncToGenerator(function* (env, args) {
    // TODO: Validate args

    var opts = args[0];

    var username = opts.username;
    var hashedPassword = opts.hashedPassword;
    var localPackageName = opts.localPackageName;
    var packageVersion = opts.packageVersion;
    var remoteUsername = opts.remoteUsername;
    var remotePackageName = opts.remotePackageName;
    var remoteFullPackageName = opts.remoteFullPackageName;
    var ngrokUrl = opts.ngrokUrl;

    var packageFullName = '@' + remoteUsername + '/' + remotePackageName;

    console.log('Saving', packageFullName, 'from', ngrokUrl, '.');
    var response = yield request.promise.get(ngrokUrl);

    var body = response.body;
    var hash = md5hex(body);

    // TODO: Verify that you can actually publish this
    var result = yield r.db('exp_host').table('publishedPackages').insert({
      publishingUsername: username, // TODO: Change to be the username from the API
      packageUsername: remoteUsername,
      packageName: remotePackageName,
      fullName: packageFullName,
      publishedTime: r.now(),
      version: packageVersion,
      contents: body,
      hash: hash });

    return { err: null, packageFullName: packageFullName, hash: hash };
  }) };
//# sourceMappingURL=../sourcemaps/api/publish.js.map