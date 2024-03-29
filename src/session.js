var _ = require('lodash');
var assert = require('assert');

var r = require('./database/r');

function SessionError(code, message, etc) {
  var err = new Error(message);
  err.code = code;
  err._isSessionError = true;
  err = _.assign(err, etc);
  return err;
}

function typeForAssociation(association) {
  if (!association) {
    throw SessionError('ASSOCIATION_NOT_PROVIDED', "Assocation not provided; can't login without it");
  }
  assert(Object.keys(association).length === 1);
  var type;
  if (association.sessionId) {
    type = 'session';
  } else if (association.browserId) {
    type = 'browser';
  } else if (association.clientId) {
    type = 'client';
  } else {
    throw SessionError('INVALID_ASSOCIATION_TYPE', "`association` must contain `sessionId` or `browserId` or `clientId`");
  }
  return type;
}

async function createLoginAsync(username, association) {

  var type = typeForAssociation(association);

  var result = await r.db('exp_host').table('loginSessions').insert(_.assign({
    loginTime: r.now(),
    type,
    username,
  }, association));

  return result.generated_keys[0];

}

async function logoutUserFromAssociationAsync(username, association) {
  return await r.db('exp_host').table('loginSessions').filter(_.assign({
    username,
  }, association)).delete();
}

async function logoutAssociationAsync(association) {
  var type = typeForAssociation(association);
  return await r.db('exp_host').table('loginSessions').filter(association).delete();
}

async function logoutUserEverywhereAsync(username) {
  return await r.db('exp_host').table('loginSessions').filter({username}).delete();
}

async function userForRequestAsync(req) {

  // First check the headers
  var username = req.header['exp-username'] || req.cookies.get('exp:username') || null;
  var clientId = req.header['exp-clientid'] || null;

  if (username) {

    var loginSessions = await r.db('exp_host').table('loginSessions').filter((row) => {
      return r.and(
        row('username').eq(username),
        r.or(
          r.and(row('sessionId').default(null).eq(req.sessionId), r.ne(null, req.sessionId)),
          r.and(row('browserId').default(null).eq(req.browserId), r.ne(null, req.browserId)),
          r.and(row('clientId').default(null).eq(clientId), r.ne(null, clientId))
        )
      );
    });

    if (!loginSessions.length) {
      throw SessionError('USER_NOT_LOGGED_IN', "User '" + username + "' isn't logged in with the given credentials", {username});
    }

    return username;

  } else {
    return undefined;
  }

}

function middleware(opts) {
  // opts = opts || {};
  return function* (next) {
    this.username$ = userForRequestAsync(this); // .then((u) => { console.log("userForRequestAsync=", u); return u });
    this.clientId = this.header['exp-clientid']
    yield *next;
  };
}

module.exports = {
  logoutAssociationAsync,
  logoutUserEverywhereAsync,
  logoutUserFromAssociationAsync,
  logoutUserFromAssociationAsync,
  userForRequestAsync,
  createLoginAsync,
  SessionError,
  typeForAssociation,
  middleware,
};
