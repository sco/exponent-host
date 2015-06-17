import dropbox from '@exponent/dropbox';
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
    var dbClient = new dropbox.Client({ key: appKey });
    dbClient.authenticate((err, client) => {
      if (err) {
        alert("Error: " + err);
      } else {
        alert("Got an authenticated client");
      }
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
