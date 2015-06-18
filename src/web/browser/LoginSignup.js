import dropbox from '@exponent/dropbox';
import 'instapromise';
import React from 'react';
import {
  Link,
} from 'react-router';

import apiClient from '../../api/client';
import { appKey } from '../../dropbox';

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

  _onClick(e) {

    // TODO: I hope this doesn't dump our whole secret file onto the website
    var client = new dropbox.Client({ key: appKey });

    client.promise.authenticate().then((client) => {
      return client.promise.getAccountInfo().then((accountInfo) => {
        console.log("AccountInfo=", accountInfo);
      });
    }, (err) => {
      alert("Error: " + err);
    });

    e.preventDefault();

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
