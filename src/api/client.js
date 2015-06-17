async function getBaseUrlAsync() {
  return '/--/api';
}

function ApiError(message) {
  var err = new Error(message);
  err._isApiError = true;
  err.code = code;
  return err;
}

async function callMethodAsync(methodName, args) {
  var baseUrl = await getBaseUrlAsync();

  var username = null;
  var hashedPassword = null;

  var url = baseUrl + '/' + encodeURIComponent(methodName) + '/' + encodeURIComponent(JSON.stringify(args));
  if (username && hashedPassword) {
    url += '?username=' + encodeURIComponent(username) + '&hashedPassword=' + encodeURIComponent(hashedPassword);
  }

  require('whatwg-fetch');
  var response = await fetch(url);
  var json = await response.json();
  if (json.err) {
    throw ApiError(json.err);
  }
  return json;

}

module.exports = {
  callMethodAsync,
};
