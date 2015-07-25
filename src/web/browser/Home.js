import React from 'react';
import {
  Jumbotron,
} from 'react-bootstrap';

import './Home.less';

import InstallationButton from './InstallationButton';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Jumbotron className="text-center">
          <div className="container">
            <h2 style="color: white; background: red;">We are updating Exponent to the latest version; downloading the app does not currently work</h2>
            <h1>Exponent</h1>
            <p>
              An app for React Native developers
            </p>
            <img
              className="headerLogo"
              src={require('./images/exponent-bare@3x.png')}
              alt="Exponent"
            />
            <p className="headerInstructions">
              With Exponent, you can write React Native experiences with any computer and a text editor and a phone. No need for Xcode or even a simulator. Download the app now to get started.
            </p>
            <InstallationButton className="headerInstallationButton" />
          </div>
        </Jumbotron>
      </div>
    );
  }
}
