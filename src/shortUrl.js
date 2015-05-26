var r = require('./database/r');

function codeToUrl(code, protocol='exp') {
  return protocol + "://exp.host/." + code;
}

async function urlForCodeAsync(code) {
  var result = await r.db('exp_host').table('shortenedUrls').filter({code});
  if (result.length > 0) {
    return result[0].url;
  } else {
    return null;
  }
}

module.exports = {
  codeToUrl,
  urlForCodeAsync,
};
