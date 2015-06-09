/**
 * A function that returns a special Error object
 *
 */
"use strict";

module.exports = function ApiError(code, env, message) {
  var err = new Error(message);
  err.code = code;
  err._isApiError = true;
  err.method = env.method;
  err.methodName = env.methodName;
  err.args = env.args;
  err.env = env;
  return err;
};

module.exports.isApiError = function (err) {
  return err && !!err._isApiError;
};
//# sourceMappingURL=../sourcemaps/api/ApiError.js.map