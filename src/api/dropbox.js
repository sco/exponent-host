var dropbox = require('@exponent/dropbox');

module.exports = {
  'drobox.saveDropboxInfo': {
    doc: "Saves a dropbox accessToken to an account",
    methodAsync: async function (env, args) {
      console.log("args=", args);
    },
  },
};
