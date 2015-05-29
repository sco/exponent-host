import React from 'react';

export default class Community extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Community</h1>
        <p>
          Come join some of the most creative and talented React Native developers. The Exponent community welcomes people who are learning React Native as well as experts looking to push the core framework forward.
        </p>

        <h2>Slack <small>Chat with fellow developers</small></h2>
        <p>
          Come join our Slack team! Enter your email in the Exponent app and we'll send you an invite. We'll make it so that you can get an invite from this site too. It's on our to-do list. Or if this sounds like a feature you'd like to try your hand at, send us a PR.
        </p>

        <h2>GitHub <small>Become a contributor</small></h2>
        <p>
          We have two main open-source GitHub repositories at <a href="https://github.com/exponentjs">@exponentjs</a>. The one for this website and the Exponent hosting service is called <a href="https://github.com/exponentjs/exponent-host"><strong>exponent-host</strong></a>. If you're working on documentation or have a cool idea for the server, this is the repo you'll want to look at.
        </p>
        <p>
          The other repository is for the <code>exp</code> program and is called <a href="https://github.com/exponentjs/exp"><strong>exp</strong></a>. This is the repo to look at if you're adding new command-line actions or are improving the development workflow.
        </p>
        <p>
          Our Slack chat is the best place to discuss pull requests, how you might implement a new feature or fix a bug, and ask questions about contributing.
        </p>

        <h2>Twitter <small>Keep up-to-date</small></h2>
        <p>
          We tweet about updates, new features, and pro tips. Follow us at <a href="https://twitter.com/exponentjs" target="_blank">@exponentjs</a>. That's a pro tip.
        </p>
      </div>
    );
  }
}
