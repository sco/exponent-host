var _ = require('lodash-node');

var ApiError = require('./ApiError');
var log = require('../log');
var password = require('../password');
var r = require('../database/r');
var username_ = require('../username');

function sanitizeUserObjectForClient(user) {
  var sanitizedUser = _.clone(user);
  delete sanitizedUser.doubleHashedPassword;
  delete sanitizedUser.hashedPassword;
  return sanitizedUser;
}

var getSanitizedUserforUsernameAsync = async function (username) {
  var users = await r.db('exp_host').table('users').filter({username: username,});
  if (users.length > 0) {
    return sanitizeUserObjectForClient(users[0]);
  } else {
    return null;
  }
};


module.exports = {
  doc: "Adds a user to the exp.host system; logs in a user if the user has already been created",
  methodAsync: async function (env, args) {

    // TODO: Put in error handling for cases where there are bad credentials
    var user = await getSanitizedUserforUsernameAsync(env.username);
    return {
      err: null,
      user: user,
    };
  },
  getSanitizedUserforUsernameAsync,
};
