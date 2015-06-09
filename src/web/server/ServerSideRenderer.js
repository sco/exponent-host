import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';

import Page from './Page';

import routes from '../browser/routes';

export default class ServerSideRenderer {
  constructor(staticResources) {
    this.staticResources = staticResources;
  }

  async renderPageAsync(url) {
    let bodyMarkup = await this.renderBodyAsync(url);
    let markup = React.renderToStaticMarkup(
      <Page
        staticResources={this.staticResources}
        markup={{ __html: bodyMarkup }}
      />
    );
    return Page.doctype + markup;
  }

  renderBodyAsync(url) {
    return new Promise((resolve, reject) => {
      Router.run(routes, url, Root => {
        // TODO: Perform data fetching here and pass it in as props of the root
        let markup = React.renderToString(<Root />);
        resolve(markup);
      });
    });
  }
}