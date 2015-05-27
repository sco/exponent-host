import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

function renderPageAsync(url) {
  return new Promise((resolve, reject) => {
    Router.run(routes, url, Root => {
      let markup = React.renderToString(<Root/>);
      resolve(markup);
    });
  });
}

export { renderPageAsync };
