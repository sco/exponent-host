'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var ent = require('ent');
var instapromise = require('instapromise');
var sendgrid = require('sendgrid');
var twilio = require('twilio');

var ApiError = require('./ApiError');
var config = require('../config');

var twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);

var sendMessageToPhoneNumberAsync = _asyncToGenerator(function* (phoneNumber, message) {
  return yield twilioClient.promise.sendMessage({
    to: phoneNumber,
    from: config.twilio.callerId,
    body: message });
});

var sendgridClient = sendgrid(config.sendgrid.username, config.sendgrid.password);

function httpRedirectUrl(url) {
  var baseUrl = 'http://exp.host';
  return baseUrl + '/--/to-exp/' + encodeURIComponent(url);
}

var sendEmailToAddressAsync = _asyncToGenerator(function* (emailAddress, message) {
  return sendgridClient.promise.send({
    to: emailAddress,
    from: 'notify@exp.host',
    subject: message.subject,
    text: message.text,
    html: message.html });
});

module.exports = {
  doc: 'Sends an e-mail or SMS to the given argument',
  methodAsync: _asyncToGenerator(function* (env, args) {
    // TODO: Validate args
    var emailOrPhone = args[0];
    var url = args[1];
    var medium;
    if (emailOrPhone.match(/@/)) {
      medium = 'email';
      console.log('E-mailing link ', url, ' to ', emailOrPhone);
      try {
        var redirectUrl = httpRedirectUrl(url);
        yield sendEmailToAddressAsync(emailOrPhone, {
          subject: 'Exponent Link: ' + url,
          html: 'Exponent Link: <a href="' + ent.encode(redirectUrl) + '">' + url + '</a>',
          text: 'Exponent Link: ' + redirectUrl + '\n' });
      } catch (e) {
        throw ApiError('FAILED_SEND_EMAIL', env, 'Failed to send e-mail: ' + e.message);
      }
    } else {
      medium = 'sms';
      console.log('Texting link ', url, ' to ', emailOrPhone);
      try {
        yield sendMessageToPhoneNumberAsync(emailOrPhone, url);
      } catch (e) {
        throw ApiError('FAILED_SEND_SMS', env, 'Failed to send SMS: ' + e.message);
      }
    }
    return { sent: true, err: null, medium: medium, recipient: emailOrPhone };
  }) };
//# sourceMappingURL=../sourcemaps/api/send.js.map