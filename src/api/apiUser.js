var _ = require('lodash-node');

var r = require('../database/r');

function sanitizeUserObjectForClient(user) {
  var sanitizedUser = _.clone(user);
  delete sanitizedUser.doubleHashedPassword;
  delete sanitizedUser.hashedPassword;
  delete sanitizedUser.password;
  return sanitizedUser;
}

async function getSanitizedUserforUsernameAsync(username) {
  var users = await r.db('exp_host').table('users').filter({username: username,});
  if (users.length > 0) {
    return sanitizeUserObjectForClient(users[0]);
  } else {
    return null;
  }
}

module.exports = {
  sanitizeUserObjectForClient,
  getSanitizedUserforUsernameAsync,
};
