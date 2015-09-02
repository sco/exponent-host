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
            <div>
              <a href="https://itunes.com/apps/exponent" target="_blank">
                <img
                  className="appStoreBadge"
                  src={require('./images/app-store-badge@3x.png')}
                  alt="Download on the App Store"
                />
              </a>
              <div className="headerBetaSection">
                <InstallationButton className="headerInstallationButton" />
                <br />
                <span>
                  Test the next version with Exponent Beta (React Native 0.11-rc)
                </span>
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
