import dropbox from '@exponent/dropbox';
import 'instapromise';
import React from 'react';
// import { connect } from 'redux/react';

import apiClient from '../../api/client';
import { appKey } from '../../dropbox';
// import * as stores from '../../stores/';

var LoginBox = React.createClass({
  getInitialState() {
    return {
      username: null,
      password: null,
      keepMeLoggedIn: true,
    };
  },

  componentDidMount() {

  },

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <div>
          <CurrentLoginInfo />
          <table>
            <tr>
              <td>
                Username: <input type="text" name="username" onChange={(e) => {
                  this.setState({username: e.target.value});
                }} />
              </td>
            </tr>
            <tr>
              <td>
                Password: <input type="password" name="password" onChange={(e) => {
                  this.setState({password: e.target.value});
                }} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" name="keepMeLoggedIn" checked={this.state.keepMeLoggedIn} value="1" onChange={(e) => {
                    this.setState({keepMeLoggedIn: e.target.checked});
                }} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Login" />
              </td>
            </tr>

          </table>
        </div>
      </form>
    );
  },

  _onSubmit(e) {
    e.preventDefault();
    apiClient.callMethodAsync('adduser', {
      username: this.state.username,
      password: this.state.password,
      type: (this.state.keepMeLoggedIn ? 'browser' : 'session'),
    }).then((result) => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
  }

});

// @connect(data => CurrentLoginInfo.DecoratedComponent.getDataProps(data))
class CurrentLoginInfo extends React.Component {

  static getDataProps(data) {
    return {
      // TODO: Get some data that is less pointless
      browserId: data.account.identity.browserId,
    };
  }

  render() {
    return (
      <div>
        Another day older
      </div>
    );
  }

}

if (typeof(window) === 'object') {
  window.l = function (result) { console.log(result); return result; };
  window.e = function (err) { console.error(err); return err; };
  window.promisePrint = (p) => {
    return p.then((result) => { console.log(result); }, (err) => { console.error(err); });
  };
}


export default LoginBox;

class ConnectToDropboxButton extends React.Component {
  render() {
    return (
      <a href="#" onClick={this._onClick}>
        <span style={{
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
