/**
 * The rethinkdb database
 *
 * We use rethinkdbdash since the interface ends up being a bit
 * nicer and it handles connection pooling, etc.
 */
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var config = require('../config');
var rethinkdbdash = require('rethinkdbdash');

exports['default'] = rethinkdbdash(config.rethinkdb);
module.exports = exports['default'];
//# sourceMappingURL=../sourcemaps/database/r.js.map