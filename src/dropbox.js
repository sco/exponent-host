var _ = require('lodash-node');
var dropbox = require('dropbox');
var instapromise = require('instapromise');
var path = require('path');
var secret = require('@exponent/secret');

var webhook = function *(next) {
  this.type = 'text/plain';
  this.body = this.query.challenge;
};

function dropboxClient(opts) {

  // Clients may be stateful so we'll return a new one each time
  // (at least for now). Remember that a Node server doesn't
  // have a fresh context for each request!

  var o = _.assign({
    key: secret.dropbox.appKey,
    secret: secret.dropbox.appSecret,
  }, opts);

  return new dropbox.Client(o);

}

async function initProjectAsync(dc, projectName, opts) {
  opts = opts || {};
  dc = dc || dropboxClient({token: secret.dropbox._ccheeverTestAccessToken});

  // TODO: Verify that the name works; figure out a good name for the directory
  // For now, we'll just gloss over this

  var result = await dc.promise.mkdir(projectName);
  var pkgJson = _.assign({
    name: projectName,
    version: '1.0.0',
    description: 'Exponent project',
    main: 'index.js',
    scripts: {
      test: "echo \"Error: no test specified\" && exit 1"
    },
  }, opts);


  await Promise.all([
    dc.promise.writeFile(projectName + '/package.json', JSON.stringify(pkgJson)),
    fs.promise.readFile(path.join(__dirname, '..', 'projectTemplate', 'index.js')).then((contents) => {
      dc.promise.writeFile(projectName + '/index.js', contents);
    }),
  ]);

  return true;

}




var readline = require("readline");
var simpleDriver = {
  authType: function() { return "code"; },
  url: function() { return ""; },
  doAuthorize: function(authUrl, stateParm, client, callback) {
    var intf = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    intf.write("Open the URL below in a browser and paste the " +
        "provided authentication code.\n" + authUrl + "\n");
    intf.question("> ", function(authCode) {
      intf.close();
      callback({code: authCode});
    });
  }
};

function testClient() {
  var client = dropboxClient();
  client.authDriver(simpleDriver);
  return client;
}



module.exports = {
  dropboxClient,
  initProjectAsync,
  testClient,
  webhook,
};
