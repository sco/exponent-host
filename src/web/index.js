import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import {
  DefaultRoute,
  NotFoundRoute,
  Route,
} from 'react-router';

import About from './About';
import Community from './Community';
import Documentation from './Documentation';
import GettingStarted from './GettingStarted';
import Help from './Help';
import Home from './Home';
import NotFound from './NotFound';
import PrivacyPolicy from './PrivacyPolicy';
import Site from './Site';
import TermsOfService from './TermsOfService';

let routes = (
  <Route path="/" handler={Site}>
    <Route name="home" path="/" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="community" handler={Community} />
    <Route name="docs" handler={Documentation}>
      <DefaultRoute handler={GettingStarted} />
    </Route>
    <Route name="help" handler={Help} />
    <Route name="privacy" handler={PrivacyPolicy} />
    <Route name="terms" handler={TermsOfService} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

// need to configure koa if we want to use real URL paths w/ history API
Router.run(routes, /*Router.HistoryLocation,*/ Handler => {
  React.render(<Handler/>, document.body);
});
