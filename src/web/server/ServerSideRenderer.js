import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';

import Page from './Page';
import routes from '../browser/routes';

export default class ServerSideRenderer {
  constructor(koaContext, staticResources) {
    this.koaContext = koaContext;
    this.staticResources = staticResources;
  }

  async renderPageAsync(url) {
    let {
      markup: bodyMarkup,
      state: routerState,
    } = await this.renderBodyAsync(url);

    for (let route of routerState.routes) {
      if (route.isNotFound) {
        this.koaContext.status = 404;
        break;
      }
    }

    let markup = React.renderToStaticMarkup(
      <Page
        staticResources={this.staticResources}
        markup={{ __html: bodyMarkup }}
      />
    );
    return Page.DOCTYPE + markup;
  }

  renderBodyAsync(url) {
    return new Promise((resolve, reject) => {
      Router.run(routes, url, (Root, state) => {
        // TODO: Perform data fetching here and pass it in as props of the root
        let markup = React.renderToString(<Root />);
        resolve({markup, state});
      });
    });
  }
}
