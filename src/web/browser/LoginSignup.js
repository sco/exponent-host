import React from 'react';
import {
  Link,
} from 'react-router';

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

  _onClick() {
    apiClient.callMethodAsync('__reverse__', ["Hello", "World"]).then((response) => {
      alert(response);
    }, (err) => {
      alert('Error! ' + err);
    });
  }
}
