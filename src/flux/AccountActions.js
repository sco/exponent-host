import ApiClient from 'ApiClient';
import Flux from 'Flux';

export default Flux.createActions({
  setAccount: function setAccount(email) {
    return {email};
  },

  registerAccountAsync: async function registerAccountAsync(email) {
    console.log("Exponent.email", email);
  },

});
