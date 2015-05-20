/**
 * The rethinkdb database
 *
 * We use rethinkdbdash since the interface ends up being a bit
 * nicer and it handles connection pooling, etc.
 */
'use strict';

var config = require('../config');
var rethinkdbdash = require('rethinkdbdash');

export default rethinkdbdash(config.rethinkdb);
