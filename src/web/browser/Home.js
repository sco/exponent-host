import React from 'react';
import {
  Jumbotron,
} from 'react-bootstrap';

import InstallationButton from './InstallationButton'

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Jumbotron className="text-center">
          <div className="container">
            <h1>Exponent</h1>
            <p>
              Exponent is an app for React Native developers.
            </p>
            <img
              className="headerLogo"
              src="/images/exponent-bare@3x.png"
              alt="Exponent"
            />
          </div>
        </Jumbotron>
        <div className="container">
          <p>
            With Exponent, you can write React Native experiences with any computer and a text editor and a phone. No need for Xcode or a simulator. Download the app now to get started.
          </p>
          <InstallationButton />
        </div>
      </div>
    );
  }
}
