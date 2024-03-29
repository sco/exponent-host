var _ = require('lodash');
var instapromise = require('instapromise');
var request = require('request');
var slackNode = require('slack-node');

var config = require('./config');

function SlackApiError(code, message) {
  var err = new Error("Slack API Call Error: " + message);
  err.code = code;
  err._isSlackApiError = true;
  return err;
}

async function slackApiCallAsync(method, params) {
  try {
    var form = {token: config.slack.apiToken};
    _.assign(form, params);
    var response = await request.promise.post({
      url: 'https://'+ config.slack.teamSite + '/api/' + method,
      form: form,
    });
  } catch (e) {
    throw SlackApiError('SLACK_API_REQUEST_FAILED', e.message);
  }

  var body = response.body;
  try {
    var result = JSON.parse(body);
  } catch (e) {
    throw SlackApiError('SLACK_BAD_JSON_RESPONSE', "Bad JSON response: " + body);
  }

  if (result.ok) {
    return result;
  } else {
    throw SlackApiError('SLACK_API_ERROR_' + result.error, result.error);
  }

}

async function sendSlackInstanceInviteAsync(email) {
  return slackApiCallAsync('users.admin.invite', {
    email: email,
    set_active: true,
    channels: 'C04Q3JTSV,C04QDAQNR,C04UAR1JN,C04Q3JTT3,C04TU9UTW,C0548CVCR',
  });
}

async function sendSlackWebhookMessageAsync(opts) {
  var s = new slackNode();
  s.setWebhook(config.slack.webhookUrl);
  var defaults = {
    channel: '#random',
    username: 'exp.host',
    icon_emoji: ':robot:',
  };
  opts = _.assign(defaults, opts);
  return s.promise.webhook(opts);
};


module.exports = {
  sendSlackInstanceInviteAsync,
  slackApiCallAsync,
  sendSlackWebhookMessageAsync,
};
