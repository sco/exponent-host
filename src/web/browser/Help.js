import React from 'react';

import SlackButton from './SlackButton';

export default class Help extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Help and Support</h1>
        <p>
          <SlackButton size="large" />
        </p>
        <p>
          Come join our Slack chat and ask your question in the #help channel. Many of the contributors are in the Pacific time zone but some of us usually stay up late too.
        </p>
      </div>
    );
  }
}
