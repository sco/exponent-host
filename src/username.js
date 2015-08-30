var _ = require('lodash');

function validateUsername(username) {

  if (!_.isString(username)) {
    return "Username must be a string";
  }

  /*
  if (username.length < 4) {
    return "Usernames must be at least 4 characters";
  }
  */

  if (username.length > 255) {
    return "Usernames can't be more than 255 characters";
  }

  if (!(username.match(/^[a-zA-Z0-9_]+$/))) {
    return "Usernames can only contain the letters and numbers and underscores";
  }

  return true;

}

module.exports = {
  validateUsername,
};
