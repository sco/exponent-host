'use strict';

var _ = require('lodash-node');

function log() {
  //var prefix = crayon.gray("[") + crayon.gray('app') + crayon.gray("]");
  var args = [].concat(Array.prototype.slice.call(arguments, 0));
  console.log.apply(console, args);
}

_.assign(log, console);

module.exports = log;
//# sourceMappingURL=sourcemaps/log.js.map