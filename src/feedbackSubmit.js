var _ = require('lodash-node');

var log = require('./log');
var r = require('./database/r');

module.exports = (function *(next) {

  // Example: { feedback: 'feedback', contactInfo: 'contactInfo' }

  var props = _.clone(this.request.body);
  _.assign(props, {
    ip: this.request.ip,
    time: r.now(),
  });
  var result = yield r.db('exp_host').table('feedback').insert(props);

  log("Logged feedback from", props.contactInfo);
  this.body = {err:null};


});
