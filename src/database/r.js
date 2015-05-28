/**
 * The rethinkdb database
 *
 * We use rethinkdbdash since the interface ends up being a bit
 * nicer and it handles connection pooling, etc.
 */
import config from '../config';
import rethinkdbdash from 'rethinkdbdash';

export default rethinkdbdash(config.rethinkdb);
