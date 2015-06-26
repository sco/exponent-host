var _ = require('lodash-node');
var promiseProps = require('promise-props');

var ApiError = require('./ApiError');
var apiUser = require('./apiUser');
var log = require('../log');
var password = require('../password');
var r = require('../database/r');
var session = require('../session');
var username_ = require('../username');


module.exports = {
  doc: "Adds a user to the exp.host system; logs in a user if the user has already been created",
  methodAsync: async function (env, args) {
    var {
      name,
      username,
      hashedPassword,
      email,
      phoneNumber,
      type,
    } = args;

    if (!hashedPassword && args.password) {
      hashedPassword = password.hashCleartextPassword(args.password);
    }

    if (!hashedPassword) {
      throw ApiError('EMPTY_PASSWORD', env);
    }

    // Validate username
    var valid = username_.validateUsername(username);
    if (valid !== true) {
      throw ApiError('INVALID_USERNAME', env, valid);
    }

    var association;
    switch (args.type) {
      case 'client':
        association = {clientId: env.clientId};
        break;
      case 'session':
        association = {sessionId: env.sessionId};
        break;
      case 'browser':
        association = {browserId: env.browserId};
        break;
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
        // 3. The passwords do match, so update any fields that the user has provided and succeed
        var props = _.clone(args);

        // Don't set `hashedPassword` because we only store `doubleHashedPassword` in the database
        delete props.hashedPassword;

        await r.db('exp_host').table('users').update(props);

        // Read the user from the database just to make sure we are getting it straight from the source
        // TODO: We can eliminate this database read for efficiency if we want to

        // console.log("Going to login. username=", username, "association=", association);
        var {user} = await promiseProps({
          user: apiUser.getSanitizedUserforUsernameAsync(username),
          __: session.createLoginAsync(username, association),
        });

        env.__setLogin__ = {
          username,
          type,
        };
        return {
          err: null,
          user,
        };

      } else {
        // 4. The passwords don't match, so return an error
        throw ApiError('INCORRECT_PASSWORD_OR_USERNAME_TAKEN', env, "That password is incorrect; or, a different user has already taken that username");
      }

    } else {
      // 5. No user with this username, create the user with the data provided and return a successful message

      var props = _.clone(args);
      props.doubleHashedPassword = password.doubleHashHashedPassword(props.hashedPassword);
      delete props.hashedPassword;

      var result = await r.db('exp_host').table('users').insert(props);
      var {user} = await promiseProps({
        user: apiUser.getSanitizedUserforUsernameAsync(username),
        __: session.createLoginAsync(username, association),
      });

      env.__setLogin__ = {
        username,
        type,
      };
      return {
        err: null,
        user: user,
      };

    }

    await r.db('exp_host').table('users').insert({
      name,
      username,
      doubleHashedPassword,
      email,
      phoneNumber,
    });

    return true;

  },
};
