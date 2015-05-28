import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';

import Page from './Page';

import routes from '../browser/routes';

export async function renderPageAsync(url) {
  let bodyMarkup = await renderBodyAsync(url);
  let markup = React.renderToStaticMarkup(
    <Page markup={{ __html: bodyMarkup }} />
  );
  return Page.doctype + markup;
}

export function renderBodyAsync(url) {
  return new Promise((resolve, reject) => {
    Router.run(routes, url, Root => {
      // TODO: Perform data fetching here and pass it in as props of the root
      let markup = React.renderToString(<Root />);
      resolve(markup);
    });
  });
}
