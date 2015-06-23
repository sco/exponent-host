import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import { Provider } from 'redux/react';

import Flux from '../../flux/Flux';
import Page from './Page';
import routes from '../browser/routes';


export default class ServerSideRenderer {
  constructor(koaContext, staticResources) {
    this.koaContext = koaContext;
    this.staticResources = staticResources;

    let stores = {
      MarioKartRacers: (data=[], action) => {
        // console.log("action=", action);
        if (action.type === 'add') {
          // console.log("Adding the racer", action.racer, "to the store");
          return data.concat(action.racer);
        } else {
          // console.log("Didn't know how to handle that action =P");
          return data;
        }
      },
    };
    /*
    this.redux = Flux.createRedux(stores);

    this.redux.dispatch({type: 'add', racer: 'Waluigi'});
    this.redux.dispatch({type: 'add', racer: 'Peach'});
    this.redux.dispatch({type: 'add', racer: 'Toad'});
    */

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
      /*
      <Provider redux={this.redux}>
        {() =>
          <Page
            staticResources={this.staticResources}
            markup={{ __html: bodyMarkup }}
          />
        }
      </Provider>
      */
    );

    return '<!DOCTYPE html>' + markup;
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
