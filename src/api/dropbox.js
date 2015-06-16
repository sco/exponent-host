var dropbox = require('dropbox');

var driver = {
  authType: function() { return 'code'; },
  url: function() { return ""; },
  doAuthorize: function(authUrl, stateParm, client, callback) {
    var interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.write("Open the URL below in a browser and paste the " +
        "provided authentication code.\n" + authUrl + "\n");
    interface.question("> ", function(authCode) {
      interface.close();
      callback({code: authCode});
    });
  }
};


module.exports = {

};
