import React from 'react';
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
import Jobs from './Jobs';
import Login from './Login';
import NotFound from './NotFound';
import PrivacyPolicy from './PrivacyPolicy';
import Site from './Site';
import TermsOfService from './TermsOfService';

export default (
  <Route path="/" handler={Site}>
    <Route name="login" handler={Login} />
    <Route name="home" path="/" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="community" handler={Community} />
    <Route name="docs" handler={Documentation}>
      <DefaultRoute handler={GettingStarted} />
    </Route>
    <Route name="help" handler={Help} />
    <Route name="jobs" handler={Jobs} />
    <Route name="privacy" handler={PrivacyPolicy} />
    <Route name="terms" handler={TermsOfService} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);
