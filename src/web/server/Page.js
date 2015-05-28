import React from 'react';
import {
  PropTypes,
} from 'react';

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
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"
          />
          <script src="http://localhost:7272/bundle.js" defer />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={this.props.markup} />
        </body>
      </html>
    );
  }
}
