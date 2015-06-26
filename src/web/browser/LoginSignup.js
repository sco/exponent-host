import { autobind } from 'core-decorators';
import dropbox from '@exponent/dropbox';
import 'instapromise';
import React from 'react';
import {
  Link,
} from 'react-router';
import { connect } from 'redux/react';

import apiClient from '../../api/client';
import { appKey } from '../../dropbox';
import * as stores from '../../stores/';

var LoginBox = /*connect(stores)*/(React.createClass({
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
          <div>
            You are currently logged in as:
          </div>
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

}));

if (typeof(window) === 'object') {
  window.l = function (result) { console.log(result); return result; };
  window.e = function (err) { console.error(err); return err; };
  window.promisePrint = (p) => {
    return p.then((result) => { console.log(result); }, (err) => { console.error(err); });
  };
}


export default LoginBox;

/*
export default class LoginBox extends React.Component {

  constructor() {
    super();
    this.state = {username: '', password: ''};
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <div>
          <div>
            Username: <input type="text" name="username" onChange={(e) => {
              this.setState({username: e.target.value});
            }} />
          </div>
          <div>
            Password: <input type="password" name="password" onChange={(e) => {
              this.setState({password: e.target.value});
            }} />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </div>
      </form>
    );
  }

  @autobind
  _onSubmit(e) {
    e.preventDefault();
    window.THIS_ = this;
    console.log("The ginger hair");
    apiClient.callMethodAsync('login', {
      username: this.state.username,
      password: this.state.password,
    }).then((result) => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
    e.preventDefault();
    return false;
  }
}
*/

//@connect((data) => {racers: data.MarioKartRacers})
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
