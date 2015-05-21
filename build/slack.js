'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var slackApiCallAsync = _asyncToGenerator(function* (method, params) {
  try {
    var form = { token: config.slack.apiToken };
    _.assign(form, params);
    var response = yield request.promise.post({
      url: 'https://' + config.slack.teamSite + '/api/' + method,
      form: form });
  } catch (e) {
    throw SlackApiError('SLACK_API_REQUEST_FAILED', e.message);
  }

  var body = response.body;
  try {
    var result = JSON.parse(body);
  } catch (e) {
    throw SlackApiError('SLACK_BAD_JSON_RESPONSE', 'Bad JSON response: ' + body);
  }

  if (result.ok) {
    return result;
  } else {
    throw SlackApiError('SLACK_API_ERROR_' + result.error, result.error);
  }
});

var sendSlackInstanceInviteAsync = _asyncToGenerator(function* (email) {
  return slackApiCallAsync('users.admin.invite', {
    email: email,
    set_active: true,
    channels: 'C04Q3JTSV,C04QDAQNR,C04UAR1JN,C04Q3JTT3,C04TU9UTW' });
});

var _ = require('lodash-node');
var instapromise = require('instapromise');
var request = require('request');

var config = require('./config');

function SlackApiError(code, message) {
  var err = new Error('Slack API Call Error: ' + message);
  err.code = code;
  err._isSlackApiError = true;
  return err;
}

module.exports = {
  sendSlackInstanceInviteAsync: sendSlackInstanceInviteAsync,
  slackApiCallAsync: slackApiCallAsync };
//# sourceMappingURL=sourcemaps/slack.js.map