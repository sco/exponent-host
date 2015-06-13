var _ = require('lodash-node');
var dropboxSync = require('@exponent/dropbox-sync');
var freeportAsync = require('freeport-async');
var jsonFile = require('@exponent/json-file');
var md5hex = require('md5hex');
var path = require('path');
var promisePrint = require('promise-print');
var secret = require('@exponent/secret');
var spawnAsync = require('@exponent/spawn-async');

var r = require('../database/r');

var MIRRORS_ROOT = '/var/cloud-packager/dropbox-mirrors/';

function mirrorRootForUsername(username, opts) {
  opts = opts || {};
  var mirrorsRoot = opts.mirrorsRoot || MIRRORS_ROOT;
  return path.join(mirrorsRoot, username);
}

async function setAccessTokenForUsernameAsync(username, dropboxAccessToken) {
  return await r.db('exp_host').table('dropboxSyncs').insert({
  }, {conflict: 'update'});
}

async function getMetadataForUsernameAsync(username) {
  return await r.db('exp_host').table('dropboxSyncs').get(username);
}

async function syncerForUsernameAsync(username, opts) {
  opts = opts || {};
  var metadata = await getMetadataForUsernameAsync(username);
  var accessToken = metadata.dropboxAccessToken;
  var client = dropboxClient(accessToken);
  
  var destRoot = mirrorRootForUsername(username, opts);
  var dotFileJson = jsonFile(path.join(destRoot, '___exponentCloudPackager___.json'), {cantReadFileDefault: {}});
  if (opts.cursor !== null) {
    opts.cursor = opts.cursor || await dotFileJson.getAsync('cursor', null);
  }

  if (!opts.quiet) {
    console.log("Starting sync for", username, "with cursor", opts.cursor);
  }

  var syncer = dropboxSync(client, destRoot, opts);

  syncer.addListener('syncedToCursor', (cursor) => {
    promisePrint(dotFileJson.mergeAsync({cursor}), {prefix: "Updated dotFile with new cursor " + cursor, alwaysPrintResult: true});
      
    r.db('exp_host').table('dropboxSyncs').update({
      username,
      cursor,
    }).then((result) => {
      console.log("Updated", username, "to cursor", cursor);
    }, console.error);
  });

  syncer.addListener('stopped', () => {

    // Commenting this out for now because I'm scared of the merges
    // messing with each other and we don't actually need this data
    // and we can't trust it (since the process might just get killed)
    //promisePrint(dotFileJson.mergeAsync({state: 'stopped'}));

    // Commenting this out because I don't think we need it and storing
    // it might be misleading
    /*
    r.db('exp_host').table('dropboxSyncs').update({
      username,
      state: 'stopped',
    }).then(null, console.error);
    */
  });

  syncer.addListener('updatedAsOf', (t) => {

    // Commenting this out for now because I'm scared of the merges
    // messing with each other and we don't actually need this data
    //promisePrint(dotFileJson.mergeAsync({updatedAsOf: t}), {prefix: "Updated dotFile with new updatedAsOf " + t});

    // Commenting this out because I don't think we need it and storing
    // it might be misleading
    /*
    r.db('exp_host').table('dropboxSyncs').update({
      username,
      updatedAsOf: r.now(), // Should we use `t` or `r.now()` here? Arguments on both sides...
    }).then(null, console.error);
    */
  });

  if (opts && opts.start) {
    syncer.startSyncing();
  }

  return syncer;
}


function dropboxClient(opts) {
  if (_.isString(opts)) {
    opts = {token: opts};
  }
  return new dropboxSync.dropbox.Client(_.assign({
    key: secret.dropbox.appKey,
    secret: secret.dropbox.appSecret,
  }, opts));
}

async function startDockerPackagerAsync(username, folder, opts) {
  if (_.isString(folder)) {
    opts = _.assign({folder}, opts);
  } else {
    opts = opts || folder || {};
  }
  // TODO: Put something here to claim ports so we avoid collisions
  // By not running something on the port *immediately* after
  // doing this, we risk collisions when lots of packagers are
  // being started in rapid succession
  var port = opts.port || await freeportAsync(12000);
  await r.db('exp_host').table('dropboxSyncs').insert({
    username,
    port,
  }, {conflict: 'update'});

  var mirrorRoot = opts.sourceRoot || mirrorRootForUsername(username);
  var folder = opts.folder || '/';
  var sourceRoot = opts.sourceRoot || path.join(mirrorRoot, folder);
  var name = 'cloudpkg_' + username + '_' + md5hex(sourceRoot, 8) + '_' + Date.now();
  var command = 'docker run --name=' + name + ' -p ' + port + ':8081 -v ' + sourceRoot + ':/var/pkgur/app-src --restart=on-failure:3 exponent/packager';


  var args = [
    'run',
    '--name=' + name,
    '-p',
    '' + port + ':8081',
    '-v',
    sourceRoot + ':/var/pkgur/app-src',
    '--restart=on-failure:3',
    'exponent/packager',
  ];

  var spawnOpts = _.assign({
    cwd: '/var/cloud-packager',
    stdio: 'inherit',
  }, opts.spawn);

  var command = opts.docker || 'docker';

  var packager$ = spawnAsync(command, args, spawnOpts);

  // TODO: Make it so it actually grabs the correct file name from
  // `package.json` instead of just always being index, etc., etc.

  var host = 'ec2-52-8-1-171.us-west-1.compute.amazonaws.com';
  var pathEtc = '/index.includeRequire.runModule.bundle?dev=true';
  var testHttpUrl = 'http://' + host + ':' + port + pathEtc;

  return {
    port,
    packager$,
    packagerProcess: packager$.child,
    testHttpUrl,
  };
}

// TODO: Separate out running the packager and the syncer
// We only need to run one syncer per user per box
// But we might need to run multiple packagers 
async function runSyncerAndPackerAsync(username, folder, opts) {
  opts = opts || {};
  if (_.isString(folder)) {
    opts.folder = folder;
  } else {
    opts = _.assign({}, folder, opts);
  }

  var syncer = await syncerForUsernameAsync(username);
  var packager$ = await startDockerPackagerAsync(username, opts);
  syncer.startSyncing();
  return {
    syncer,
    packager$,
  };
  

}

module.exports = {
  dropbox: dropboxSync.dropbox,
  dropboxClient,
  dropboxSync,
  getMetadataForUsernameAsync,
  r,
  startDockerPackagerAsync,
  syncerForUsernameAsync,
  runSyncerAndPackerAsync,
};
