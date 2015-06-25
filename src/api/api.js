var _ = require('lodash-node');

var ApiError = require('./ApiError');
var log = require('../log');

var Api = {
  send: require('./send'),
  adduser: require('./adduser'),
  recordEmail: require('./recordEmail'),
  publish: require('./publish'),
  whoami: require('./whoami'),
  shortenUrl: require('./shortenUrl'),
  logout: require('./logout'),
  __reverse__: {
    doc: "Reverses the first argument; for testing the API",
    methodAsync: async function (env, args) {
      return args.map((s) => { return s.split("").reverse().join(""); }).reverse();
    },
  },
};

_.assign(Api, require('./dropbox'));
_.assign(Api, require('./session'));

var callMethod = function*(next) {
  var method = Api[this.params.method];
  var jsonArgs = this.params.jsonArgs;
  if ((!jsonArgs) || (jsonArgs == 'help') || (jsonArgs == 'doc')) {
    this.body = {help: method.doc || "[No documentation available]"};
  } else {
    var argsOk = true;
    try {
      var args = JSON.parse(jsonArgs);
    } catch (e) {
      argsOk = false;
      this.body = {err: "Problem with JSON arguments Error: " + e}
    }

    if (argsOk) {
      //this.session.id = this.session.id || Math.random();
      //console.log("keys=", Object.keys(this));
      //console.log("session=", this.session);
      //console.log("passport=", this.passport);
      // console.log("cookies=", this.cookies.keys);
      var methodName = this.params.method;
      var username;
      try {
        username = yield this.username$;
      } catch (e) {
        if (e.code === 'USER_NOT_LOGGED_IN') {
          if (_.contains([
            'login',
            'logout',
            'adduser',
          ], methodName)) {
            username = null;
          } else {
            this.body = {err: '' + e.message + '.', _isApiError: true, code: e.code,};
            return;
          }
        } else {
          throw e;
        }
      }
      var env = {
        args,
        method,
        methodName,
        ip: this.request.ip,
        _request: this.request,
        username,
        sessionId: this.sessionId,
        browserId: this.browserId,
        clientId: this.clientId,
        // _session: this.session,
        // TODO: Add in other environment stuff here
      };
      try {
        var result = yield method.methodAsync(env, args);
        if (!_.isObject(result)) {
          result = {result: result};
        }
        result.err = null;
        this.body = result;
      } catch (e) {
        if (ApiError.isApiError(e)) {
          log.error("API Error:", e);
          this.body = {err: '' + e.message + '.', _isApiError: true, code: e.code,};
        } else {
          log.error("Server Error:", e);
          this.body = {err: '' + e.message + '.', apiError: false, code: 'SERVER_ERROR',};
        }
      }
    }
  }
};

module.exports = {
  Api,
  callMethod,
};
