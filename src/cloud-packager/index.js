var _ = require('lodash-node');
var dropboxSync = require('dropbox-sync');
var path = require('path');
var secret = require('@exponent/secret');

var r = require('../database/r');

var MIRRORS_ROOT = '/tmp/dropbox-mirrors/';

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
  if (opts.cursor !== null) {
    opts.cursor = metadata.cursor;
  }
  var syncer = dropboxSync(client, path.join(mirrorsRoot, username), opts);

  syncer.addListener('syncedToCursor', (cursor) => {
    r.db('exp_host').table('dropboxSyncs').update({
      username,
      cursor,
    }).then((result) => {
      console.log("Updated", username, "to cursor", cursor);
    }, console.error);
  });

  syncer.addListener('stopped', () => {
    r.db('exp_host').table('dropboxSyncs').update({
      username,
      state: 'stopped',
    }).then(null, console.error);
  });

  syncer.addListener('updatedAsOf', (t) => {
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
