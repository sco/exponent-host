import { autobind } from 'core-decorators';
import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const MANIFEST_URL = 'https://www.dropbox.com/s/wjr7trh1zg12s6b/manifest.plist?dl=1';
const ITUNES_BASE_URL = 'itms-services://?action=download-manifest&url=';

// TODO: Do an OS version check in componentDidMount
export default class InstallationButton extends React.Component {
  render() {
    return (
      <Button {...this.props} bsStyle="primary" onClick={this._downloadApp}>
        Install the Beta
      </Button>
    );
  }

  @autobind
  _downloadApp() {
    let url = ITUNES_BASE_URL + encodeURIComponent(MANIFEST_URL);
    window.location = url;
  }
}
