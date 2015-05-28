var r = require('./database/r');

module.exports = function *(next) {
  let { username, package: packageName } = this.params;
  var packageFullName = '@' + username + '/' + (packageName || '');

  var result = yield r.db('exp_host').table('publishedPackages')
    .filter({fullName: packageFullName})
    .orderBy(r.desc('publishedTime'))
    .limit(1);

  if (result.length > 0) {
    var article = result[0];
    if (!article.unpublished) {
      // TODO: Put metadata in the response headers

      // Set headers
      this.set({
        'ETag': article.hash,
        'Last-Modified': article.publishedTime,
      });

      this.type = 'application/javascript';
      this.body = article.contents;
      return;
    }
  }

  this.type = 'text/plain';
  this.throw(404, 'Article not found: ' + packageFullName);
};
