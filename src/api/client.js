async function getBaseUrlAsync() {
  return '/--/api';
}

function ApiError(code, message) {
  var err = new Error(message);
  err._isApiError = true;
  err.code = code;
  return err;
}

async function callMethodAsync(methodName, args) {
  var baseUrl = await getBaseUrlAsync();

  var username = null;
  var hashedPassword = null;

  // To avoid parse errors when you `stringify` then `parse` `undefined`.
  args = args || null;

  var url = baseUrl + '/' + encodeURIComponent(methodName) + '/' + encodeURIComponent(JSON.stringify(args));
  if (username && hashedPassword) {
    url += '?username=' + encodeURIComponent(username) + '&hashedPassword=' + encodeURIComponent(hashedPassword);
  }

  require('whatwg-fetch');
  var response = await fetch(url, {
  credentials: 'same-origin'
  });
  var json = await response.json();
  if (json.err) {
    throw ApiError(json.err.code || 'UNKNOWN_API_ERROR', json.err);
  }
  return json;

}

if (typeof(window) === 'object') {
  window.apiAsync = callMethodAsync;
  window.loginAsync = function (username, password, type) {
    return window.apiAsync('adduser', {
      username,
      password,
      type,
    }).then((result) => {

    });

  };
}

module.exports = {
  callMethodAsync,
};
