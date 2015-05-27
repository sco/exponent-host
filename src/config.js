'use strict';

const path = require('path');
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

  console.warn(
    'Create %s with your configuration secrets to set up the Exponent host',
    path.relative(process.cwd(), path.join(__dirname, 'secret.js'))
  );
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

module.exports = {
  server: {
    port: 3000,
  },

  webpack: {
    port: 3001,
  },

  rethinkdb: {
    discovery: false,
    servers: [
      {host: 'localhost', port: 28015},
    ],
    db: 'exp_host',
  },

  twilio: {
    accountSid: null,
    authToken: null,
    appSid: null,
    callerId: null,
    developerPhoneNumber: null,
  },

  sendgrid: {
    username: null,
    password: null,
  },

  ...secret,
};
