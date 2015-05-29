import React from 'react';

export default class Help extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Help and Support</h1>
        <p>
          Come join our Slack chat and ask your question in the #help channel. Many of the contributors are in the Pacific time zone but some of us usually stay up late too.
        </p>
        <p>
          If you have suggestions for what should go here, let us know in Slack or send a pull request for this page on GitHub.
        </p>
      </div>
    );
  }
}
