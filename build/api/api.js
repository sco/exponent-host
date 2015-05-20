'use strict';

var _ = require('lodash-node');

var ApiError = require('./ApiError');
var log = require('../log');

var Api = {
  send: require('./send'),
  adduser: require('./adduser'),
  recordEmail: require('./recordEmail'),
  publish: require('./publish'),
  whoami: require('./whoami') };

var callMethod = function* callMethod(next) {
  var method = Api[this.params.method];
  var jsonArgs = this.params.jsonArgs;
  if (!jsonArgs || jsonArgs == 'help' || jsonArgs == 'doc') {
    this.body = { help: method.doc || '[No documentation available]' };
  } else {
    var argsOk = true;
    try {
      var args = JSON.parse(jsonArgs);
    } catch (e) {
      argsOk = false;
      this.body = { err: 'Problem with JSON arguments Error: ' + e };
    }

    if (argsOk) {
      var env = {
        args: args,
        method: method,
        methodName: this.params.method };
      try {
        var result = yield method.methodAsync(env, args);
        if (!_.isObject(result)) {
          result = { result: result };
        }
        result.err = null;
        this.body = result;
      } catch (e) {
        if (ApiError.isApiError(e)) {
          log.error('API Error:', e);
          this.body = { err: '' + e.message + '.', _isApiError: true, code: e.code };
        } else {
          log.error('Server Error:', e);
          this.body = { err: '' + e.message + '.', apiError: false, code: 'SERVER_ERROR' };
        }
      }
    }
  }
};

module.exports = {
  Api: Api,
  callMethod: callMethod };

// TODO: Add in other environment stuff here
//# sourceMappingURL=../sourcemaps/api/api.js.map