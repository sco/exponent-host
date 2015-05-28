import { autobind } from '@ide/core-decorators';
import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import {
} from 'react-router-bootstrap';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Exponent</h1>
        <h2>Exponent is an app for React Native developers.</h2>
        <img src="http://cdc03.com/ExponentIcon@3x.png" alt="Exponent" />
        <p>
          With Exponent, you can write React Native experiences with any computer and a text editor and a phone. No need for Xcode or a simulator. Download the app now to get started.
        </p>
        {this._renderDownloadButton()}
      </div>
    );
  }

  _renderDownloadButton() {
    return (
      <Button bsStyle="primary" onClick={this._downloadApp}>
        Download
      </Button>
    );
  }

  @autobind
  _downloadApp() {
    var manifestUrl = 'https://www.dropbox.com/s/wjr7trh1zg12s6b/manifest.plist?dl=1';
    var url = 'itms-services://?action=download-manifest&url=' + encodeURIComponent(manifestUrl);
    window.location = url;
  }

  componentDidMount() {

  }
}
