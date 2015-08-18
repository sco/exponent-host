var instapromise = require('instapromise');
var md5hex = require('@exponent/md5hex');
var request = require('request');

var ApiError = require('./ApiError');
var config = require('../config');
var r = require('../database/r');
var slack = require('../slack');

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
      stealth,
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

    var expUrl = 'exp://exp.host/' + packageFullName;

    // Don't `await` this since we don't want it to block responding from the API
    var appetizeUrl = 'http://exp.host/--/appetize?url=' + encodeURIComponent(expUrl);

    // A URL that mobile Safari can open that will redirect you to the app
    var redirectUrl = 'http://exp.host/--/to-exp/' + encodeURIComponent(expUrl);

    if (!stealth) {
      slack.sendSlackWebhookMessageAsync({
        icon_emoji: ':fire:',
        username: 'exp.host',
        channel: '#offthepress',
        text: "@" + username + " just published the package " + packageFullName + "@" + packageVersion + "\n" + expUrl + "\n" + appetizeUrl + "\n" + redirectUrl,
      }).then(() => {
        // Sent Slack message about new pages
      }, (err) => {
        console.error("Failed to send Slack message about new package");
      });
    }

    return {err: null, packageFullName, hash, expUrl, appetizeUrl, redirectUrl};
  },
};
