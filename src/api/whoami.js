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
    var {
      name,
      username,
      hashedPassword,
      email,
      phoneNumber,
    } = args;

    // Validate username
    var valid = username_.validateUsername(username);
    if (valid !== true) {
      throw ApiError('INVALID_USERNAME', env, valid);
    }

    var doubleHashedPassword = password.doubleHashHashedPassword(hashedPassword);

    // Here is what this API method does:
    // 1. Check to see if there already is a user with this username in the database
    // 2. If there is, then see if the passwords match
    // 3.     If the passwords do match, then update any fields that the user has provided
    //        and return a message about a successful login
    // 4.     If the passwords don't match, then throw an Error saying that the user already
    //        exists but the passwords don't match
    // 5. If there is no user with this username, create the user with the data provided and
    //    return a successful login message
    //

    // TODO: Make this more robustly transactional
    // TODO: Consider making this use sessions or something different than the password scheme
    // we've set up (though I think using passwords is straightforward and simplest for now)

    // 1. Check to see if a user with that name already exists
    var existingUsers = await r.db('exp_host').table('users').filter({username: username});

    if (existingUsers.length > 0) {

      // 2. There is a user with this username, see if the passwords match
      var existingUser = existingUsers[0];
      if (password.hashedPasswordMatches(hashedPassword, existingUser.doubleHashedPassword)) {

        var user = await getSanitizedUserforUsernameAsync(username);

        return {
          err: null,
          user: user,
        };

      } else {
        // 4. The passwords don't match, so return an error
        throw ApiError('INCORRECT_PASSWORD', env, "That password is incorrect");
      }

    } else {
      throw ApiError('NO_USER_WITH_USERNAME', env, "There is no user with that username, sorry.");
    }

  },
  getSanitizedUserforUsernameAsync,
};
