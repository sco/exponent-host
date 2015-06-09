'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

const secret = requireSecret();

function requireSecret() {
  // Local configuration takes precendence
  var secret = attemptToRequire('./secret');
  if (secret) {
    return secret;
  }

  // This is a private package used by the production host and Exponent
  secret = attemptToRequire('@exponent/secret');
  if (secret) {
    return secret;
  }

  console.warn('Create %s with your configuration secrets to set up the Exponent host', _path2['default'].relative(process.cwd(), _path2['default'].join(__dirname, 'secret.js')));
  return null;
}

function attemptToRequire(moduleName) {
  try {
    return require(moduleName);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return null;
    }
    throw e;
  }
}

exports['default'] = _extends({
  server: {
    port: 3000 },

  webpack: {
    port: 3001 },

  rethinkdb: {
    discovery: false,
    servers: [{ host: 'localhost', port: 28015 }],
    db: 'exp_host' },

  twilio: {
    accountSid: null,
    authToken: null,
    appSid: null,
    callerId: null,
    developerPhoneNumber: null },

  sendgrid: {
    username: null,
    password: null } }, secret);
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/config.js.map