var _ = require('lodash-node');
var dropboxSync = require('@exponent/dropbox-sync');
var jsonFile = require('@exponent/json-file');
var path = require('path');
var promisePrint = require('promise-print');
var secret = require('@exponent/secret');

var r = require('../database/r');

var MIRRORS_ROOT = '/var/cloud-packager/dropbox-mirrors/';

async function setAccessTokenForUsernameAsync(username, dropboxAccessToken) {
  return await r.db('exp_host').table('dropboxSyncs').insert({
  }, {upsert: true});
}

async function getMetadataForUsernameAsync(username) {
  return await r.db('exp_host').table('dropboxSyncs').get(username);
}

async function syncerForUsernameAsync(username, opts) {
  opts = opts || {};
  var metadata = await getMetadataForUsernameAsync(username);
  var accessToken = metadata.dropboxAccessToken;
  var mirrorsRoot = opts.mirrorsRoot || MIRRORS_ROOT;
  var client = dropboxClient(accessToken);
  
  var destRoot = path.join(mirrorsRoot, username);
  var dotFileJson = jsonFile(path.join(destRoot, '___exponentCloudPackager___.json'), {cantReadFileDefault: {}});
  if (opts.cursor !== null) {
    opts.cursor = opts.cursor || await dotFileJson.getAsync('cursor', null);
  }

  if (!opts.quiet) {
    console.log("Starting sync for", username, "with cursor", opts.cursor);
  }

  var syncer = dropboxSync(client, path.join(mirrorsRoot, username), opts);

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

    r.db('exp_host').table('dropboxSyncs').update({
      username,
      state: 'stopped',
    }).then(null, console.error);
  });

  syncer.addListener('updatedAsOf', (t) => {

    // Commenting this out for now because I'm scared of the merges
    // messing with each other and we don't actually need this data
    //promisePrint(dotFileJson.mergeAsync({updatedAsOf: t}), {prefix: "Updated dotFile with new updatedAsOf " + t});

    r.db('exp_host').table('dropboxSyncs').update({
      username,
      updatedAsOf: r.now(), // Should we use `t` or `r.now()` here? Arguments on both sides...
    }).then(null, console.error);
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

module.exports = {
  getMetadataForUsernameAsync,
  dropboxClient,
  r,
  syncerForUsernameAsync,
  dropboxSync,
  dropbox: dropboxSync.dropbox,
};
