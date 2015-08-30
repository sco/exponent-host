var _ = require('lodash');

var ApiError = require('./ApiError');
var apiUser = require('./apiUser');
var log = require('../log');
var password = require('../password');
var r = require('../database/r');
var username_ = require('../username');

module.exports = {
  doc: "Adds a user to the exp.host system; logs in a user if the user has already been created",
  methodAsync: async function (env, args) {

    // TODO: Put in error handling for cases where there are bad credentials
    var user = await apiUser.getSanitizedUserforUsernameAsync(env.username);
    return {
      err: null,
      user: user,
    };
  },
};
