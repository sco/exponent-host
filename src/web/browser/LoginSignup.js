import dropbox from '@exponent/dropbox';
import React from 'react';
import {
  Link,
} from 'react-router';
import secret from '@exponent/secret';
import thenify from '../../thenify';

import apiClient from '../../api/client';

export default class ConnectToDropboxButton extends React.Component {
  render() {
    return (
      <a href="#" onClick={this._onClick}>
        <span style={{
            backgroundColor: '#cccccc',
            fontWeight: 'bold',
        }}>Connect to Dropbox</span>
      </a>
    );
  }

  componentDidMount() {
  }

  _onClick() {
    // TODO: I hope this doesn't dump our whole secret file onto the website
    var dbClient = new dropbox.Client({ key: secret.dropbox.appKey });
    dbClient.authenticate((err, client) => {
      if (err) {
        alert("Error: " + err);
      } else {
        alert("Got an authenticated client");
      }
    });
  }

}

/*
    apiClient.callMethodAsync('__reverse__', ["Hello", "World"]).then((response) => {
      alert(response);
    }, (err) => {
      alert('Error! ' + err);
    });
  }
}
*/
