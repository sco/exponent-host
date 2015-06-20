/**
 * @providesModule AccountStore
 */

import AccountActions from 'AccountActions';
import Flux from 'Flux';
import { Record } from 'immutable';

const AccountActionTypes = Flux.getActionTypes(AccountActions);
const AccountRecord = Record({
  email: null,
});

export default Flux.createStore(new AccountRecord(), {
  [AccountActionTypes.setAccount](state, action) {
    let { email } = action;
    return state.merge({ email });
  },

  [AccountActionTypes.registerAccountAsync](state, action) {
    let { email } = action;
    return state.merge({ email });
  },
});
