'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _ = require('lodash-node');

var ApiError = require('./ApiError');
var log = require('../log');
var slack = require('../slack');

module.exports = {
  doc: 'Invites a user to the Slack instance',
  methodAsync: _asyncToGenerator(function* (env, args) {
    var email = args.email;

    return slack.sendSlackInstanceInviteAsync(email);
  }) };
//# sourceMappingURL=../sourcemaps/api/inviteToSlack.js.map