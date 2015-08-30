var _ = require('lodash');

var ApiError = require('./ApiError');
var log = require('../log');
var password = require('../password');
var r = require('../database/r');
var session = require('../session');
var username_ = require('../username');

module.exports = {
  doc: "Logs out",
  methodAsync: async function (env, args) {

    if (env.username) {
      await session.logoutUserEverywhereAsync(env.username);
    }

    return {
      err: null,
    };
  },
};
