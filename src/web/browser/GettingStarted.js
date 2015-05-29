import React from 'react';

import InstallationButton from './InstallationButton'

export default class GettingStarted extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Getting Started <small>Create your first Exponent article</small></h1>
          <p>
            All you need is your computer and iPhone to start creating articles with Exponent using React Native.
          </p>

          <h2>Install Exponent</h2>
          <p>
            Install Exponent on your iPhone by tapping this button.
            <InstallationButton />
            Exponent will download to your homescreen. The first time you launch the app, you'll see a message asking you to give the app permission to run. This is just because the app is being installed outside of the App Store, but it still can't do anything a normal app isn't allowed to do in terms of security.
          </p>

          <h2>Make a Project</h2>
          <p>
            If you don't already have <code>io.js</code> installed, do that using <code>nvm</code> (find it at <a href="https://github.com/creationix/nvm">https://github.com/creationix/nvm</a>).
          </p>
          <p>
            On your computer, get the Exponent program by running <code>npm install -g exp</code>.
          </p>
          <p>
            Next, in an empty directory, run <code>exp init</code> to create a file with your app&apos;s code.
          </p>
          <p>
            Serve the app with <code>exp start</code> and enter your phone number or email address when prompted.
          </p>
          <p>
            Open the email or text we sent you on your phone and tap the link inside to open your app.
          </p>

          <h2>Next Steps</h2>
          <p>
            When you ran <code>exp init</code>, we made a file called <code>index.js</code>. Edit this file and tap the refresh button in Exponent to see your latest work.
          </p>
          <p>
            Exponent also works with your existing React Native apps. Set the name of your component to "main" in the app registry and run <code>exp start</code> from your app's directory.
          </p>

          <h2>
            Publishing
          </h2>
          <p>
            When you're happy with something you've made, you can upload it to be shared with others even when your computer is offline using <code>exp publish</code>. Just run <code>exp adduser</code> to create an exp.host account, and then <code>exp publish</code> to publish your article, and we'll give you the URL it's been published to that you can share with anyone. (You can share your development URLs too but they won't be as fast and won't work if your computer is offline.)
          </p>
      </div>
    );
  }
}
