import React from 'react';
import {
  PropTypes,
} from 'react';

import flatten from 'lodash-node/modern/array/flatten';
import path from 'path';

export default class Page extends React.Component {
  static doctype = '<!DOCTYPE html>';

  static propTypes = {
    markup: PropTypes.shape({
      __html: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Exponent</title>
          {/*
          <link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/apple-touch-icon-152x152.png" />
          */}
          <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon-180x180.png" />
          <link rel="icon" type="image/png" href="/images/favicons/favicon-32x32.png" sizes="32x32" />
          {/*
          <link rel="icon" type="image/png" href="/images/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/images/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/images/favicons/android-chrome-192x192.png" sizes="192x192" />
          <link rel="manifest" href="/images/favicons/manifest.json" />
          */}
          <meta name="msapplication-TileColor" content="#023c69" />
          <meta name="msapplication-TileImage" content="/images/favicons/mstile-144x144.png" />
          <meta name="theme-color" content="#023c69" />
          {this._renderStyleSheetLinks()}
          {this._renderJavaScriptElements()}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={this.props.markup} />
        </body>
      </html>
    );
  }

  _renderStyleSheetLinks() {
    let filenames = flatten([
      this._getChunkAssetFilenames('commons', 'css'),
      this._getChunkAssetFilenames('main', 'css'),
    ]);
    return filenames.map(filename => {
      let uri = this.props.staticResources.publicPath + filename;
      return <link key={filename} rel="stylesheet" href={uri} />;
    });
  }

  _renderJavaScriptElements() {
    let filenames = flatten([
      this._getChunkAssetFilenames('commons', 'js'),
      this._getChunkAssetFilenames('main', 'js'),
    ]);
    return filenames.map(filename => {
      let uri = this.props.staticResources.publicPath + filename;
      return <script key={filename} src={uri} defer />;
    });
  }

  _getChunkAssetFilenames(chunkName, assetType) {
    let assets = this.props.staticResources.assetsByChunkName[chunkName];
    if (!Array.isArray(assets)) {
      assets = [assets];
    }
    return assets.filter(filename => {
      return path.extname(filename) === '.' + assetType;
    });
  }
}
