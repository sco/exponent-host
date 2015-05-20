var crypto = require('crypto');

var CLIENT_SALT_PREFIX = 'EXPONENT!';
var SALT_PREFIX = 'Articles!';
var SALT_SUFFIX = 'OfTheFuture!';

function doubleHashHashedPassword(hashedPassword) {
  return crypto.createHash('md5').update(SALT_PREFIX + hashedPassword + SALT_SUFFIX).digest('hex');
}

function doubleHashCleartextPassword(cleartextPassword) {
  return doubleHashHashedPassword(hashCleartextPassword(cleartextPassword));
}

function hashCleartextPassword(cleartextPassword) {
  return crypto.createHash('md5').update(CLIENT_SALT_PREFIX + cleartextPassword).digest('hex');
}

function cleartextPasswordMatches(cleartextPassword, doubleHashedPassword) {
  return (doubleHashCleartextPassword(cleartextPassword) === doubleHashedPassword);
}

function hashedPasswordMatches(hashedPassword, doubleHashedPassword) {
  return (doubleHashHashedPassword(hashedPassword) === doubleHashedPassword);
}

function doubleHashedPasswordMatches(doubleHashedPassword1, doubleHashedPassword2) {
  return (doubleHashedPassword1 === doubleHashedPassword2);
}

module.exports = {
  hashCleartextPassword,
  doubleHashHashedPassword,
  doubleHashCleartextPassword,
  cleartextPasswordMatches,
  hashedPasswordMatches,
  doubleHashedPasswordMatches,
};
