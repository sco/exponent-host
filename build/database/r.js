/**
 * The rethinkdb database
 *
 * We use rethinkdbdash since the interface ends up being a bit
 * nicer and it handles connection pooling, etc.
 */
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _rethinkdbdash = require('rethinkdbdash');

var _rethinkdbdash2 = _interopRequireDefault(_rethinkdbdash);

exports['default'] = (0, _rethinkdbdash2['default'])(_config2['default'].rethinkdb);
module.exports = exports['default'];
//# sourceMappingURL=../sourcemaps/database/r.js.map