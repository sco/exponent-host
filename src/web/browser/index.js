import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

let isInitialRender = true;

Router.run(routes, Router.HistoryLocation, (Root, state) => {
  React.render(<Root />, document.getElementById('root'));
  if (isInitialRender) {
    isInitialRender = false;
  } else {
    global.ga('send', 'pageview', state.path);
  }
});
