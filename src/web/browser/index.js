import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

Router.run(routes, Router.HistoryLocation, Root => {

  let redux =
  
  React.render((
    <Provider>
      <Root/>
    </Provider>
    ), document.getElementById('root'));
  global.ga('send', 'pageview');
});
