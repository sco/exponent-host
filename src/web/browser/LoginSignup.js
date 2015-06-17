import dropbox from 'dropbox';
import React from 'react';
import {
  Link,
} from 'react-router';
import secret from '@exponent/secret';

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
    dbClient.promise.authenticate().then((client) => {
      alert("Got an authenticated client");
    }, (err) => {
      alert("Error: " + err);
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
