'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _ = require('lodash-node');

var ApiError = require('./ApiError');
var log = require('../log');
var r = require('../database/r');
var slack = require('../slack');

module.exports = {
  doc: 'Records that an e-mail address is in use in the system',
  methodAsync: _asyncToGenerator(function* (env, args) {

    var email = args[0];
    if (!email) {
      throw ApiError('BAD_ARGS', env, '`email` parameter required');
    }

    var result = yield r.db('exp_host').table('emails').get(email).replace(function (row) {
      return r.branch(row.eq(null),
      // Insert
      {
        email: email,
        firstSeen: r.now(),
        lastSeen: r.now(),
        timesSeen: 1 },
      // Update
      row.merge({
        lastSeen: r.now(),
        timesSeen: row('timesSeen').add(1)['default'](1) }));
    });

    // Send an invite to the Slack Instance to them
    slack.sendSlackInstanceInviteAsync(email).then(function (result) {
      log('Invited', email, 'to the Slack Instance');
    }, function (err) {
      log.error('Failed to invite', email, 'to Slack:', err);
    });

    return true;
  })
};
//# sourceMappingURL=../sourcemaps/api/recordEmail.js.map