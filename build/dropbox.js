'use strict';

var _ = require('lodash-node');

var webhook = function* webhook(next) {
  this.type = 'text/plain';
  this.body = this.query.challenge;
};

module.exports = {
  webhook: webhook };
//# sourceMappingURL=sourcemaps/dropbox.js.map