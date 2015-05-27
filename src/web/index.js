import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

// need to configure koa if we want to use real URL paths w/ history API
Router.run(routes, Router.HistoryLocation, Root => {
  React.render(<Root/>, document.getElementById('root'));
});
