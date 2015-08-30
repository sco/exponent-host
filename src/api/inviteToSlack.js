var _ = require('lodash');

var ApiError = require('./ApiError');
var log = require('../log');
var slack = require('../slack');

module.exports = {
  doc: "Invites a user to the Slack instance",
  methodAsync: async function (env, args) {
    var {email} = args;
    return slack.sendSlackInstanceInviteAsync(email);
  },
};
