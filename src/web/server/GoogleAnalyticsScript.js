/**
 * @flow weak
 */
import React from 'react';
import {
  PropTypes,
} from 'react';

export default class GoogleAnalyticsScript extends React.Component {
  static propTypes = {
    propertyId: PropTypes.string.isRequired,
  };

  render() {
    let markup = { __html: this._getAnalyticsScript() };
    return <script dangerouslySetInnerHTML={markup} />;
  }

  _getAnalyticsScript(): string {
    return `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', '${this.props.propertyId}', {siteSpeedSampleRate: 100});
ga('send', 'pageview');
`.replace(/\n/g, '');
  }
}
