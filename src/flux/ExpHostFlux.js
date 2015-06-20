'use strict';

import AccountActions from './AccountActions';
import AccountStore from './AccountStore';
import Flux from './Flux';

let stores = {
  account: AccountStore,
};

let redux = Flux.createRedux(stores);

// Populate the stores with data from disk. Currently this is super simple since
// we have only one item to read. Later this initialization may get more complex
/*
redux.initialization = AsyncStorage.getItem('Exponent.email').then(email => {
  console.log(email);
  redux.dispatch(AccountActions.setAccount(email));
}, error => {
  console.error(error.stack);
});
*/

export default redux;
