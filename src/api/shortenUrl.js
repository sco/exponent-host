var _ = require('lodash-node');
var bases = require('bases');

var ApiError = require('./ApiError');
var log = require('../log');
var password = require('../password');
var r = require('../database/r');
var shortUrl = require('../shortUrl');
var username_ = require('../username');

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

module.exports = {
  doc: "Shortens any URL and returns a short URL",
  methodAsync: async function (env, args) {
    var url = args.url;

    // First lookup the URL in the database
    var result = await r.db('exp_host').table('shortenedUrls').filter({
      url,
    });

    // If the URL already exists, return it
    var code;
    if (result.length > 0) {
      code = result[0].code;
    } else {

      // Increment the counter
      var result = await r.db('exp_host').table('counters')
        .get('shortenedUrls')
        .update({ n: r.row('n').add(1) }, {returnChanges: true})
        ;
      var n = result.changes[0].new_val.n;

      code = bases.toBase26(n);
      await r.db('exp_host').table('shortenedUrls').insert({
        code,
        n,
        createdTime: r.now(),
        url,
        ip: env.ip,
      });
    }

    return {
      code,
      longUrl: url,
      shortUrl: shortUrl.codeToUrl(code),
    };

  }
};
