var _ = require('lodash-node');

var webhook = function *(next) {
  this.type = 'text/plain';
  this.body = this.query.challenge;
};

module.exports = {
  webhook,
};
