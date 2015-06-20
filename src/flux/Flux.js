import { mapValues } from 'lodash-node';
import { composeStores, createDispatcher, createRedux } from 'redux';

export default class Flux {
  static createRedux(stores) {
    let store = composeStores(stores);
    let dispatcher = createDispatcher(
      store,
      [enablePromises]
    );
    return createRedux(dispatcher);
  }

  static createActions(actionCreators) {
    return mapValues(actionCreators, (createAction, name) =>
      function(...args) {
        let action = createAction(...args);
        let isThenable = (action != null) && (typeof action.then === 'function');
        if (isThenable) {
          return action.then(action => ({ type: name, ...action }));
        }
        return { type: name, ...action };
      }
    );
  }

  static getActionTypes(actionCreators) {
    return mapValues(actionCreators, (createAction, name) => name);
  }

  static createStore(initialState, actionHandlers) {
    return function(state = initialState, action) {
      let actionHandler = actionHandlers[action.type];
      let hasActionHandler = typeof actionHandler === 'function';
      return hasActionHandler ? actionHandler(state, action) : state;
    };
  }
}

function enablePromises(next) {
  return function dispatchPromise(action) {
    let isThenable = (action != null) && (typeof action.then === 'function');
    return isThenable ? action.then(next) : next(action);
  };
}
