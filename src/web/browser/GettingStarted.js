import React from 'react';

import InstallationButton from './InstallationButton';

export default class GettingStarted extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Getting Started <small>Create your first Exponent article</small></h1>
          <p>
            All you need is a Mac and iPhone to start creating articles with Exponent using React Native. You'll just have to install one app on your phone and one app on your computer and you can get started.
          </p>
          <p>
            (We're planning on Windows and Linux and Android support but for now we only support Mac and iPhone.)
          </p>

          <h2>Install Exponent</h2>
          <p>
            Install Exponent on your iPhone.
          </p>
          <p>
            <a href="https://itunes.com/apps/exponent" target="_blank">
              <img
                className="appStoreBadge"
                src={require('./images/app-store-badge@3x.png')}
                alt="Download on the App Store"
              />
            </a>
          </p>

          <h2>Install XDE on your Mac</h2>
            <ul>
              <li><a href="https://s3.amazonaws.com/exp-us-standard/xde/Exponent-XDE-0.2.0.zip" target="_BLANK">Download this .zip file</a> which contains the XDE Mac application.</li>

              <li>Unzip the archive and drag the Exponent XDE app into your Applications folder</li>

              <li>Double click on the Exponent XDE app to open it</li>
            </ul>

          <h2>Make a new project</h2>

            <ul>
              <li>Click the "New" button in the upper left hand corner of the window.</li>

              <li>Then choose or make an empty directory where you want your project to live and hit OK.</li>

              <li>This will setup that directory with a very basic React Native project that will work with Exponent and show off some basic but still cool things about React Native.</li>

            </ul>

          <h2>Viewing a project on your phone</h2>

            <p>Once you create a new project (or open an existing project), you'll see some log messages that the packager has started and ngrok has started and the URL bar will get populated.</p>

            <p>The url that begins with exp://... is the URL you can use to access your project while you're developing it. To view this on your phone, do the following:</p>

            <ul>
              <li>If you don't already have it, go get the Exponent app on your iPhone or iPad. It's available <a href="https://itunes.com/apps/exponent" target="_BLANK">here</a>. We'll produce an Android version as soon as React Native for Android is ready, but for now it's only iOS!</li>

              <li>Open the Exponent app and put in your e-mail address if it is your first time opening the app</li>

              <li>Go back to the xde GUI on your computer and put in your phone number or e-mail address into the text box in the header, then hit the "Send Link" button. This will send a link via e-mail or text message, so make sure you use an address or phone number you can access from your phone.</li>

              <li>Check your e-mail or texts and tap the link. The Exponent app should open and you should be able to view your experience there!</li>

            </ul>

          <p>
            <InstallationButton />
          </p>
          <p>
            The first time you launch the app, you'll see a message asking you to give the app permission to run. This is just because the app is being installed outside of the App Store, but it still can't do anything a normal app isn't allowed to do in terms of security.
          </p>
      </div>
    );
  }
}
