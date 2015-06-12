var _ = require('lodash-node');
var dropbox = require('dropbox');
var events = require('events');
var {
  EventEmitter,
} = events;
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

async function traverseAsync(dropboxPath, emitter, opts) {
  // Events:
  // file
  // directory
  // done
  opts = opts || {};
  if (!emitter) {
    emitter = new EventEmitter();
    emitter.on('file', (n, m) => {
      console.log('file:', n);
    });
  }

  opts.client = opts.client || dropboxClient({token: secret.dropbox._ccheeverTestAccessToken});

  var awaitables = [];

  var metadata = await opts.client.promise.metadata(dropboxPath);
  if (metadata.isFile) {
    emitter.emit('file', dropboxPath, metadata);
  }
  if (metadata.isFolder) {
    emitter.emit('folder', dropboxPath, metadata);
    var entries = await opts.client.promise.readdir(dropboxPath);
    for (var e of entries) {
      awaitables.push(traverseAsync(path.join(dropboxPath, e), emitter, opts));
    }
  }

  await Promise.all(awaitables);
  emitter.emit('done', dropboxPath);

  return true;

}

async function syncFolderAsync(dropboxFolderPath, destPath, opts) {

  opts = opts || {};
  var dc = opts.dc || dropboxClient({token: secret.dropbox._ccheeverTestAccessToken});

  var entries = await dc.promise.readdir(dropboxFolderPath);

  for (var e of entries) {
    var p = path.join(dropboxFolderPath, e);
    var m = await dc.promise.metadata(p);
    if (m.isFolder) {
      await syncFolderAsync(p, path.join(destPath, e), opts);
    }
    if (m.isFile) {
      console.log(e);
    }
  }
  return;

/*
  var filePaths = [];
  var awaitables = [];
  var metadataAwaitables = [];
  for (var e of entries) {
    ((e) => {
      metadataAwaitables.push(dc.promise.metadata(path.join(dropboxFolderPath, e)).then((metadata) => {
        console.log("e=",e);
        if (metadata.isFolder) {
          awaitables.push(syncFolderAsync(path.join(dropboxFolderPath, e), path.join(destPath, e), opts));
        } else if (metadata.isFile) {
          filePaths.push(metadata);
        } else {
          console.warn("Not sure what to with this", metadata);
        }
      }));
    })(e);
  }

  console.log("awaiting metadataAwaitables... for", dropboxFolderPath);
  await metadataAwaitables;
  console.log("awaiting awaitables... for", dropboxFolderPath);
  await awaitables;

  for (var fp of filePaths) {
    console.log(fp);
  }
  */

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
  /*
  var client = dropboxClient();
  client.authDriver(simpleDriver);
  return client;
  */
  return dropboxClient({token: secret.dropbox._ccheeverTestAccessToken});
}



module.exports = {
  dropboxClient,
  initProjectAsync,
  syncFolderAsync,
  testClient,
  traverseAsync,
  webhook,
};
