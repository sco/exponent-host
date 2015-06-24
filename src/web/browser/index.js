import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';

import routes from './routes';
import * as stores from '../../stores';

Router.run(routes, Router.HistoryLocation, Root => {
  // This is running on the client
  //console.log("reduxState=", window.EXP.reduxState);
  let redux = createRedux(stores, window.EXP.reduxState);
  window.REDUX = redux;
  React.render((
      <Provider redux={redux}>
        {() =>
          <Root />
        }
      </Provider>
    ), document.getElementById('root'));
  global.ga('send', 'pageview');
});
