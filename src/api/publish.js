var instapromise = require('instapromise');
var md5hex = require('@exponent/md5hex');
var request = require('request');

var ApiError = require('./ApiError');
var config = require('../config');
var r = require('../database/r');

module.exports = {
  doc: "Publishes a a package to exp.host",
  methodAsync: async function (env, args) {
    // TODO: Validate args

    var opts = args[0];

    var {
      username,
      hashedPassword,
      localPackageName,
      packageVersion,
      remoteUsername,
      remotePackageName,
      remoteFullPackageName,
      ngrokUrl,
    } = opts;

    var packageFullName = '@' + remoteUsername + '/' + remotePackageName;

    console.log("Saving", packageFullName, "from", ngrokUrl, ".");
    var response = await request.promise.get(ngrokUrl);

    var body = response.body;
    var hash = md5hex(body);

    // TODO: Verify that you can actually publish this
    var result = await r.db("exp_host").table("publishedPackages").insert({
      publishingUsername: username, // TODO: Change to be the username from the API
      packageUsername: remoteUsername,
      packageName: remotePackageName,
      fullName: packageFullName,
      publishedTime: r.now(),
      version: packageVersion,
      contents: body,
      hash: hash,
    });

    return {err: null, packageFullName, hash,};
  },
};
