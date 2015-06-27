import React from 'react';
import {connect} from 'redux/react';

@connect(data => CurrentLoginInfo.DecoratedComponent.getDataProps(data))
export default class CurrentLoginInfo extends React.Component {

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
