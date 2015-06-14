import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

Router.run(routes, Router.HistoryLocation, Root => {
  React.render(<Root/>, document.getElementById('root'));
  global.ga('send', 'pageview');
});
