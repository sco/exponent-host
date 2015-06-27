var _ = require('lodash-node');

// what's important is that Store is a pure function,
// and you can write it anyhow you like.

// the Store signature is (state, action) => state,
// and the state shape is up to you: you can use primitives,
// objects, arrays, or even ImmutableJS objects.

function accountStore(data={}, action) {
  switch (action.type) {
    case 'update':
      return _.assign(_.clone(data), action.update);
    default:
      return data;
  }
}

module.exports = {
  account: accountStore,
};
