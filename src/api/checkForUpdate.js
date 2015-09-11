let ApiError = require('./ApiError');
let log = require('../log');

module.exports = {
  doc: "Checks to see if there are updates to XDE",
  methodAsync: async function (env, args) {
    let {
      product,
      clientVersion,
    } = args;

    if (product === 'xde') {
      return {
        currentVersion: '0.2.0',
        updateAvailable: false,
        updateUrl: 'http://exponentjs.com/download',
      };
    } else {
      throw ApiError('UNKNOWN_PRODUCT', env, "Don't know about product " + product);
    }

  },
};
